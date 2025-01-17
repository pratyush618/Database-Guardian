package utils

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Generates a connection string
func GenerateConnectionString() (string, error) {
	// Load the environment variables
	err := godotenv.Load()
	if err != nil {
		return "", err
	}

	DB_NAME := os.Getenv("DB_NAME")
	DB_PASSWORD := os.Getenv("DB_PASSWORD")
	DB_USER := os.Getenv("DB_USER")
	DB_HOST := os.Getenv("DB_HOST")
	DB_PORT := os.Getenv("DB_PORT")

	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME), nil
}
