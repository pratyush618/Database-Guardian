package db

import (
	"log"

	"database/sql"

	"github.com/Annany2002/guard/pkg/logger"
	"github.com/Annany2002/guard/pkg/utils"

	_ "github.com/lib/pq"
)

var (
	customLog = logger.NewLogger()
)

func ConnectToPostgres(db_name, db_password, db_user, db_host, db_port string) (*sql.DB, error) {
	dbURL, err := utils.GenerateConnectionString(db_name, db_password, db_user, db_host, db_port)
	if err != nil {
		log.Fatal(err)
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
