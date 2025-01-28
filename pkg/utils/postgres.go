package utils

import (
	"compress/gzip"
	"database/sql"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/Annany2002/guard/pkg/logger"
	_ "github.com/lib/pq"
)

var customLog = logger.NewLogger()

// Generates a connection string
func GenerateConnectionString(db_name, db_password, db_user, db_host, db_port string) (string, error) {
	if db_name == "" || db_password == "" || db_user == "" || db_host == "" || db_port == "" {
		return "", errors.New("missing one or more connection parameters")
	}
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", db_user, db_password, db_host, db_port, db_name), nil
}

// RestoreGzFile restores a PostgreSQL database from a .gz file
func RestoreGzFile(filePath, host, username, password, dbname, port string) error {
	// Create a temporary directory to extract the file
	tempDir, err := os.MkdirTemp("", "guard")
	if err != nil {
		customLog.Errorf("Failed to create temporary directory: %v", err)
		return err
	}
	defer os.RemoveAll(tempDir)

	// Open the .gz file
	gzFile, err := os.Open(filePath)
	if err != nil {
		customLog.Errorf("Failed to open .gz file %s: %v", filePath, err)
		return err
	}
	defer gzFile.Close()

	// Create a gzip reader
	gzReader, err := gzip.NewReader(gzFile)
	if err != nil {
		customLog.Errorf("Failed to create gzip reader: %v", err)
		return err
	}
	defer gzReader.Close()

	// Create a temporary file to write the decompressed content
	tempFilePath := filepath.Join(tempDir, "backup.sql")
	tempFile, err := os.Create(tempFilePath)
	if err != nil {
		customLog.Errorf("Failed to create temporary file %s: %v", tempFilePath, err)
		return err
	}
	defer tempFile.Close()

	// Copy the decompressed content to the temporary file
	_, err = io.Copy(tempFile, gzReader)
	if err != nil {
		customLog.Errorf("Failed to copy decompressed content to temporary file: %v", err)
		return err
	}

	// Restore the database from the temporary file
	return RestoreSqlFile(tempFilePath, host, username, password, dbname, port)
}

// RestoreSqlFile restores a PostgreSQL database from a .sql file
func RestoreSqlFile(filePath, host, username, password, dbname, port string) error {
	// Connect to the 'postgres' database (or another existing database)
	connStr, err := GenerateConnectionString("postgres", password, username, host, port)
	if err != nil {
		customLog.Errorf("%v", err)
	}

	// Connect to the PostgreSQL database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		customLog.Errorf("Failed to connect to PostgreSQL: %v", err)
		return err
	}
	defer db.Close()

	// Ping the database to ensure the connection is valid
	err = db.Ping()
	if err != nil {
		customLog.Errorf("Failed to ping PostgreSQL: %v", err)
		return err
	}

	// Drop the existing database if it exists
	dropDBQuery := fmt.Sprintf("DROP DATABASE IF EXISTS %s;", dbname)
	_, err = db.Exec(dropDBQuery)
	if err != nil {
		customLog.Errorf("Failed to drop database %s: %v", dbname, err)
		return err
	}

	// Create the database
	createDBQuery := fmt.Sprintf("CREATE DATABASE %s;", dbname)
	_, err = db.Exec(createDBQuery)
	if err != nil {
		customLog.Errorf("Failed to create database %s: %v", dbname, err)
		return err
	}

	// Close the connection to the database
	db.Close()

	// Reconnect to the newly created database
	connStr, err = GenerateConnectionString(dbname, password, username, host, port)
	if err != nil {
		customLog.Errorf("%v", err)
	}

	db, err = sql.Open("postgres", connStr)
	if err != nil {
		customLog.Errorf("Failed to connect to PostgreSQL: %v", err)
		return err
	}
	defer db.Close()

	// Ping the database to ensure the connection is valid
	err = db.Ping()
	if err != nil {
		customLog.Errorf("Failed to ping PostgreSQL: %v", err)
		return err
	}

	// Read the SQL file
	sqlBytes, err := os.ReadFile(filePath)
	if err != nil {
		customLog.Errorf("Failed to read SQL file %s: %v", filePath, err)
		return err
	}

	// Split the SQL file into individual statements
	sqlStatements := strings.Split(string(sqlBytes), ";")

	// Execute each SQL statement
	for _, stmt := range sqlStatements {
		stmt = strings.TrimSpace(stmt)
		if stmt == "" {
			continue
		}
		_, err := db.Exec(stmt)
		if err != nil {
			customLog.Errorf("Failed to execute SQL statement: %s\nError: %v", stmt, err)
			return err
		}
	}
	return nil
}
