/*
Copyright © 2025 Annany Vishwakarma <annivish2002@gmail.com>
*/
package cmd

import (
	"fmt"
	"log"
	"os"

	"github.com/Annany2002/Database-Guardian/pkg/backup"
	"github.com/Annany2002/Database-Guardian/pkg/db"
	"github.com/Annany2002/Database-Guardian/pkg/logger"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	config_file      string
	output_directory string
	customLog        = logger.NewLogger()
)

var rootCmd = &cobra.Command{
	Use:   "data-guard",
	Short: "A powerful command-line interface (CLI) utility built in Go for backing up and restoring databases.",
	Long:  "The Database Guardian is a command-line interface (CLI) utility built in Go for backing up and restoring databases. It supports multiple database management systems (DBMS) such as MySQL, PostgreSQL, MongoDB, and SQLite. This tool allows users to schedule automatic backups, compress backup files, and store them locally or in the cloud",

	Run: func(cmd *cobra.Command, args []string) {
		customLog.Info("Starting backup operation...")
		err := backup.FullBackup(output_directory)
		if err != nil {
			log.Fatalf("Error while performing backup: %v", err)
		}
		customLog.Info("Backup operation completed successfully.")
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	rootCmd.PersistentFlags().StringVar(&config_file, "config", "config/config.yaml", "config file path")
	rootCmd.PersistentFlags().StringVar(&output_directory, "output", "./backup", "backup files destination")
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

func initConfig() {
	db, err := db.ConnectToPostgres()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()
	if config_file != "" {
		// Use config file from the flag
		viper.SetConfigFile(config_file)
	} else {
		// Search for config in default locations
		viper.AddConfigPath(".")
		viper.AddConfigPath("./config")
		viper.SetConfigName("config")
		viper.SetConfigType("yaml")
	}

	if err := viper.ReadInConfig(); err != nil {
		fmt.Println("Error reading config:", err)
		os.Exit(1)
	}
}
