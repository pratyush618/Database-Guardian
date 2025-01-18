package db

import (
	"log"

	"database/sql"

	"github.com/Annany2002/Database-Guardian/pkg/logger"
	"github.com/Annany2002/Database-Guardian/pkg/utils"

	_ "github.com/lib/pq"
)

var (
	customLog = logger.NewLogger()
)

func ConnectToPostgres() (*sql.DB, error) {
	dbURL, err := utils.GenerateConnectionString()
	if err != nil {
		log.Fatal("DATABASE_URL environment variable not set", err)
	}

	// Connect to the database
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("Error opening database: %v\n", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatalf("Error connecting to the database: %v\n", err)
	}

	customLog.Info("Connected to PostgreSQL database")

	return db, nil
}
