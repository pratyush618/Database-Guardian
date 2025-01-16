package main

import (
	"context"
	"log"

	"github.com/Annany2002/Database-Guardian/pkg/db"
)

func main() {
	conn, err := db.ConnectToPG()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer conn.Close(context.Background())

	log.Println("Connected to PostgreSQL database")
	// Your application logic here
}
