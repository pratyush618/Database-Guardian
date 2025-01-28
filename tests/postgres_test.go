package tests

import (
	"database/sql"
	"fmt"
	"os"
	"strings"
	"testing"

	_ "github.com/lib/pq"

	"github.com/Annany2002/guard/pkg/backup"
	"github.com/Annany2002/guard/pkg/db"
	"github.com/Annany2002/guard/pkg/utils"
	"github.com/joho/godotenv"
)

func TestPostgresConnection(t *testing.T) {
	// Load environment variables
	err := godotenv.Load("../.env")
	if err != nil {
		t.Fatalf("Error loading environment variables: %v", err)
	}

	db_user := os.Getenv("DB_USER")
	db_password := os.Getenv("DB_PASSWORD")
	db_host := os.Getenv("DB_HOST")
	db_port := os.Getenv("DB_PORT")
	db_name := os.Getenv("DB_NAME")

	_, err = db.ConnectToPostgres(db_name, db_password, db_user, db_host, db_port)

	if err != nil {
		t.Fatalf("%v", err)
	}
}

func TestPostgresRestoration(t *testing.T) {
	// Load environment variables
	err := godotenv.Load("../.env")
	if err != nil {
		t.Fatalf("Error loading environment variables: %v", err)
	}

	dbname := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST")
	filePath := os.Getenv("FILE_PATH")
	port := os.Getenv("DB_PORT")
	username := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")

	// Connect to the 'postgres' database (or another existing database)
	adminConnStr, err := utils.GenerateConnectionString("postgres", password, username, host, port)
	if err != nil {
		t.Fatalf("Failed to generate admin connection string: %v", err)
	}
	adminDB, err := sql.Open("postgres", adminConnStr)
	if err != nil {
		t.Fatalf("Failed to connect to PostgreSQL admin database: %v", err)
	}
	defer adminDB.Close()

	// Ping the admin database to ensure the connection is valid
	err = adminDB.Ping()
	if err != nil {
		t.Fatalf("Failed to ping PostgreSQL admin database: %v", err)
	}

	// Drop the existing database if it exists
	dropDBQuery := fmt.Sprintf("DROP DATABASE IF EXISTS %s;", dbname)
	_, err = adminDB.Exec(dropDBQuery)
	if err != nil {
		t.Fatalf("Failed to drop database %s: %v", dbname, err)
	}

	// Create the database
	createDBQuery := fmt.Sprintf("CREATE DATABASE %s;", dbname)
	_, err = adminDB.Exec(createDBQuery)
	if err != nil {
		t.Fatalf("Failed to create database %s: %v", dbname, err)
	}

	// Close the admin connection
	adminDB.Close()

	// Reconnect to the newly created database
	connStr, err := utils.GenerateConnectionString(dbname, password, username, host, port)
	if err != nil {
		t.Fatalf("Failed to generate connection string: %v", err)
	}
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		t.Fatalf("Failed to connect to PostgreSQL: %v", err)
	}
	defer db.Close()

	// Ping the database to ensure the connection is valid
	err = db.Ping()
	if err != nil {
		t.Fatalf("Failed to ping PostgreSQL: %v", err)
	}

	// Read the SQL file
	sqlBytes, err := os.ReadFile(filePath)
	if err != nil {
		t.Fatalf("Failed to read SQL file %s: %v", filePath, err)
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
			t.Fatalf("Failed to execute SQL statement: %s\nError: %v", stmt, err)
		}
	}
}

func TestPostgresBackup(t *testing.T) {
	// Load environment variables
	err := godotenv.Load("../.env")
	if err != nil {
		t.Fatalf("Error loading environment variables: %v", err)
	}

	db_user := os.Getenv("DB_USER")
	db_password := os.Getenv("DB_PASSWORD")
	db_host := os.Getenv("DB_HOST")
	db_port := os.Getenv("DB_PORT")
	db_name := os.Getenv("DB_NAME")
	outputDir := "../dummy"

	err = backup.FullBackup(db_name, db_password, db_user, db_host, outputDir, db_port)
	if err != nil {
		t.Fatalf("Error while backup: %v", err)
		return
	}

}
