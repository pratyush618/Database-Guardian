package cmd

import (
	"os"

	"github.com/Annany2002/guard/pkg/backup"
	"github.com/Annany2002/guard/pkg/logger"
	"github.com/Annany2002/guard/pkg/storage"
	"github.com/spf13/cobra"
)

var (
	output_directory string
	customLog        = logger.NewLogger()
	backupFilePath   string
)

func BackupCommand() *cobra.Command {
	var backupCmd = &cobra.Command{
		Use:   "backup",
		Short: "Backup a database",
		Long:  `Backup a database to a specified storage location`,
		Run: func(cmd *cobra.Command, args []string) {
			customLog.Info("Starting backup operation...")

			dbms, _ := cmd.Flags().GetString("dbms")
			host, _ := cmd.Flags().GetString("host")
			port, _ := cmd.Flags().GetString("port")
			username, _ := cmd.Flags().GetString("username")
			password, _ := cmd.Flags().GetString("password")
			dbname, _ := cmd.Flags().GetString("dbname")
			storageType, _ := cmd.Flags().GetString("storage")
			output_directory, _ := cmd.Flags().GetString("output")

			switch storageType {
			case "s3":
				// Handle S3 storage
				bucketName := os.Getenv("BUCKET_NAME")
				s3Client, err := storage.NewS3Client(bucketName)
				if err != nil {
					customLog.Errorf("Failed to create S3 client: %v", err)
					return
				}
				objectKey := backupFilePath
				err = s3Client.UploadFileToS3(backupFilePath, objectKey)
				if err != nil {
					customLog.Errorf("Failed to upload backup file to S3: %v", err)
					return
				}

			// Handle Local Storage
			case "local":
				{
				}
			}

			switch dbms {
			case "pg":
				{
					err := backup.FullBackup(dbname, password, username, host, output_directory, port)
					if err != nil {
						customLog.Fatalf("Error while performing backup: %v", err)

					}
				}
			}
			customLog.Info("Backup operation completed successfully.")
		},
	}

	backupCmd.Flags().StringVar(&output_directory, "output", "./backup", "backup files destination")
	backupCmd.Flags().StringP("dbms", "d", "pg", "Database Management System (m: mysql, pg: postgres, mg: mongodb, s: sqlite)")
	backupCmd.Flags().StringP("host", "H", "localhost", "Database host")
	backupCmd.Flags().StringP("port", "p", "5432", "Database port")
	backupCmd.Flags().StringP("username", "u", "", "Database username")
	backupCmd.Flags().StringP("password", "P", "", "Database password")
	backupCmd.Flags().StringP("dbname", "D", "", "Database name")
	backupCmd.Flags().StringP("storage", "s", "local", "Storage location (local, s3, gcs, azure)")

	backupCmd.MarkFlagRequired("username")
	backupCmd.MarkFlagRequired("password")
	backupCmd.MarkFlagRequired("dbname")

	return backupCmd
}
