package cmd

import (
	"github.com/Annany2002/guard/pkg/restore"
	"github.com/spf13/cobra"
)

var file_path string

func RestoreCommand() *cobra.Command {
	var restoreCmd = &cobra.Command{
		Use:   "restore",
		Short: "Restore a database from a backup",
		Long:  "Restore a database from a specified storage location",

		Run: func(cmd *cobra.Command, args []string) {
			customLog.Info("Starting restoring operation")

			filePath, _ := cmd.Flags().GetString("file")
			dbms, _ := cmd.Flags().GetString("dbms")
			host, _ := cmd.Flags().GetString("host")
			dbname, _ := cmd.Flags().GetString("dbname")
			port, _ := cmd.Flags().GetInt("port")
			username, _ := cmd.Flags().GetString("username")
			password, _ := cmd.Flags().GetString("password")

			switch dbms {
			case "postgres":
				{
					err := restore.RestorePostgres(host, username, password, dbname, filePath, port)
					if err != nil {
						customLog.Errorf("Failed to restore PostgreSQL database: %v", err)
						return
					}
				}
			}

			customLog.Info("Restore operation completed successfully.")
		},
	}

	restoreCmd.Flags().StringVar(&file_path, "file", "", "Path from where the db should be restored")
	restoreCmd.Flags().StringP("dbms", "d", "", "Database Management System (mysql, postgres, mongodb, sqlite)")
	restoreCmd.Flags().IntP("port", "p", 0, "Database port")
	restoreCmd.Flags().StringP("dbname", "D", "", "Database name")
	restoreCmd.Flags().StringP("host", "H", "", "Database host")
	restoreCmd.Flags().StringP("username", "U", "", "Database username")
	restoreCmd.Flags().StringP("password", "P", "", "Database password")

	restoreCmd.MarkFlagRequired("host")
	restoreCmd.MarkFlagRequired("file")
	restoreCmd.MarkFlagRequired("dbms")
	restoreCmd.MarkFlagRequired("port")
	restoreCmd.MarkFlagRequired("username")
	restoreCmd.MarkFlagRequired("password")
	restoreCmd.MarkFlagRequired("dbname")

	return restoreCmd
}
