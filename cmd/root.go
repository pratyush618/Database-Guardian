/*
Copyright © 2025 Annany Vishwakarma <annivish2002@gmail.com>
*/
package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "guard",
	Short: "A powerful command-line interface (CLI) utility built in Go for backing up and restoring databases.",
	Long:  "Database Guardian is a command-line interface (CLI) utility built in Go for backing up and restoring databases. It supports multiple database management systems (DBMS) such as MySQL, PostgreSQL, MongoDB, and SQLite. This tool allows users to schedule automatic backups, compress backup files, and store them locally or in the cloud",
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	initCommands()
}

func initCommands() {
	rootCmd.AddCommand(BackupCommand(), VersionCommand(), RestoreCommand())
}
