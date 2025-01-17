package main

import (
	"log"

	"github.com/Annany2002/Database-Guardian/pkg/backup"
	"github.com/Annany2002/Database-Guardian/pkg/db"
)

func main() {
	db, err := db.ConnectToPostgres()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	path := "./output"
	if err := backup.FullBackup(path); err != nil {
		log.Fatalf("error while backup %v", err)
	}
}
