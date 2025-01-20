package tests

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"strings"
	"testing"

	_ "github.com/lib/pq"

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

	num, err := strconv.Atoi(db_port)
	if err != nil {
		t.Fatal(err)
	}

	dbURL, err := utils.GenerateConnectionString(db_name, db_password, db_user, db_host, num)
	if err != nil {
		t.Fatal(err)
	}

	// Open database connection
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		t.Fatalf("Error opening database connection: %v", err)
	}
	defer db.Close()

	// Ping the database to check connectivity
	err = db.Ping()
	if err != nil {
		t.Fatalf("Error connecting to database: %v", err)
	}
	t.Log("Connection Test successful")
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

	connStr := fmt.Sprintf("host=%s port=%v user=%s password=%s dbname=postgres sslmode=disable", host, port, username, password)

	// Connect to the PostgreSQL database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		t.Errorf("Failed to connect to PostgreSQL: %v", err)
	}
	defer db.Close()

	// Ping the database to ensure the connection is valid
	err = db.Ping()
	if err != nil {
		t.Errorf("Failed to ping PostgreSQL: %v", err)

	}

	// Drop the existing database if it exists
	dropDBQuery := fmt.Sprintf("DROP DATABASE IF EXISTS %s;", dbname)
	_, err = db.Exec(dropDBQuery)
	if err != nil {
		t.Errorf("Failed to drop database %s: %v", dbname, err)
	}

	// Create the database
	createDBQuery := fmt.Sprintf("CREATE DATABASE %s;", dbname)
	_, err = db.Exec(createDBQuery)
	if err != nil {
		t.Errorf("Failed to create database %s: %v", dbname, err)
	}

	// Close the connection to the database
	db.Close()

	// Reconnect to the newly created database
	connStr = fmt.Sprintf("host=%s port=%v user=%s password=%s dbname=%s sslmode=disable", host, port, username, password, dbname)
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		t.Errorf("Failed to connect to PostgreSQL: %v", err)
	}
	defer db.Close()

	// Ping the database to ensure the connection is valid
	err = db.Ping()
	if err != nil {
		t.Errorf("Failed to ping PostgreSQL: %v", err)
	}

	// Read the SQL file
	sqlBytes, err := os.ReadFile(filePath)
	if err != nil {
		t.Errorf("Failed to read SQL file %s: %v", filePath, err)
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
			t.Errorf("Failed to execute SQL statement: %s\nError: %v", stmt, err)

		}
	}

	t.Log("Database restored successfully")
}
