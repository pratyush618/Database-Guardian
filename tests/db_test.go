package db_test

import (
	"database/sql"
	"fmt"
	"os"
	"testing"

	_ "github.com/lib/pq"

	"github.com/joho/godotenv"
)

func TestDBConnection(t *testing.T) {
	// Load environment variables
	err := godotenv.Load("../.env")
	if err != nil {
		t.Fatalf("Error loading environment variables: %v", err)
	}

	dbURL := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

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
}
