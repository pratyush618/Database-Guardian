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
		Long:  "Backup a database to a specified storage location",
		Run: func(cmd *cobra.Command, args []string) {
			customLog.Info("Starting backup operation...")

			backupType, _ := cmd.Flags().GetString("type")
			dbms, _ := cmd.Flags().GetString("dbms")
			host, _ := cmd.Flags().GetString("host")
			port, _ := cmd.Flags().GetInt("port")
			username, _ := cmd.Flags().GetString("username")
			password, _ := cmd.Flags().GetString("password")
			dbname, _ := cmd.Flags().GetString("dbname")
			storageType, _ := cmd.Flags().GetString("storage")
			output_directory, _ := cmd.Flags().GetString("output")
			// uploadToCloud, _ := cmd.Flags().GetBool("cloud")

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
			case "postgres":
				{
					if backupType == "full" {
						err := backup.FullBackup(dbname, password, username, host, output_directory, port)
						if err != nil {
							customLog.Fatalf("Error while performing backup: %v", err)
						}
					}
				}
			}
			customLog.Info("Backup operation completed successfully.")
		},
	}

	rootCmd.Flags().BoolP("cloud", "C", false, "Upload db to cloud or not")
	backupCmd.Flags().StringVar(&output_directory, "output", "./backup", "backup files destination")
	backupCmd.Flags().StringP("type", "t", "full", "Type of backup (full, incremental, differential)")
	backupCmd.Flags().StringP("dbms", "d", "", "Database Management System (mysql, postgres, mongodb, sqlite)")
	backupCmd.Flags().StringP("host", "H", "", "Database host")
	backupCmd.Flags().IntP("port", "p", 0, "Database port")
	backupCmd.Flags().StringP("username", "u", "", "Database username")
	backupCmd.Flags().StringP("password", "P", "", "Database password")
	backupCmd.Flags().StringP("dbname", "D", "", "Database name")
	backupCmd.Flags().StringP("storage", "s", "local", "Storage location (local, s3, gcs, azure)")

	backupCmd.MarkFlagRequired("host")
	backupCmd.MarkFlagRequired("dbms")
	backupCmd.MarkFlagRequired("port")
	backupCmd.MarkFlagRequired("username")
	backupCmd.MarkFlagRequired("password")

	return backupCmd
}
