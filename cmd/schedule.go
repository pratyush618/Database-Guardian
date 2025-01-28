package cmd

import (
	"path/filepath"

	"github.com/Annany2002/guard/pkg/backup"
	"github.com/Annany2002/guard/pkg/storage"
	"github.com/robfig/cron/v3"
	"github.com/spf13/cobra"
)

var (
	storagePath string
	c           cron.Cron
	jobs        map[cron.EntryID]*cron.Entry
)

func ScheduleCommand() *cobra.Command {
	var scheduleCmd = &cobra.Command{
		Use:   "sched",
		Short: "Schedule backups",
		Long:  `Schedule a backup task to run at specified intervals or cron expressions.`,
		Run: func(cmd *cobra.Command, args []string) {
			customLog.Info("Starting scheduling operation...")

			cronExp, _ := cmd.Flags().GetString("cron")
			// dbms, _ := cmd.Flags().GetString("dbms")
			host, _ := cmd.Flags().GetString("host")
			port, _ := cmd.Flags().GetString("port")
			username, _ := cmd.Flags().GetString("username")
			password, _ := cmd.Flags().GetString("password")
			dbname, _ := cmd.Flags().GetString("dbname")
			storageType, _ := cmd.Flags().GetString("storage")
			storagePath, _ := cmd.Flags().GetString("path")
			bucketName, _ := cmd.Flags().GetString("bucket")

			// create a cron scheduler
			c := cron.New()

			backupFunc := func() {
				customLog.Info("Started backup operation")

				switch storageType {
				case "local":
					err := backup.FullBackup(dbname, password, username, host, storagePath, port)
					if err != nil {
						customLog.Fatalf("Error while backup: %v", err)
						return
					}

				case "s3":
					// Handle S3 storage
					s3Client, err := storage.NewS3Client(bucketName)
					if err != nil {
						customLog.Errorf("%v", err)
					}

					objectKey := filepath.Base(backupFilePath)

					err = s3Client.UploadFileToS3(backupFilePath, objectKey)
					if err != nil {
						customLog.Errorf("Failed to upload backup file to S3: %v", err)
						return
					}
					customLog.Infof("Storing backup file %s in S3 bucket %s as %s", backupFilePath, bucketName, objectKey)
				}
			}

			// Add the backup function to the cron scheduler
			_, err := c.AddFunc(cronExp, backupFunc)
			if err != nil {
				customLog.Errorf("Failed to add backup function to cron scheduler: %v", err)
				return
			}

			// Start the cron scheduler
			c.Start()

			// Keep the application running
			select {}
		},
	}

	scheduleCmd.Flags().StringP("cron", "c", "@daily", "Cron expression for scheduling (e.g., @daily, @hourly, */5 * * * *)")
	scheduleCmd.Flags().StringP("dbms", "d", "pg", "Database Management System (m: mysql, pg: postgres, mg: mongodb, s: sqlite)")
	scheduleCmd.Flags().StringP("host", "H", "localhost", "Database host")
	scheduleCmd.Flags().StringP("port", "p", "5432", "Database port")
	scheduleCmd.Flags().StringP("username", "u", "", "Database username")
	scheduleCmd.Flags().StringP("password", "P", "", "Database password")
	scheduleCmd.Flags().StringP("dbname", "D", "", "Database name")
	scheduleCmd.Flags().StringP("storage", "s", "local", "Storage location (local, s3, gcs, azure)")
	scheduleCmd.Flags().StringVar(&storagePath, "path", "backups", "Local storage path (only for local storage)")
	scheduleCmd.Flags().StringP("bucket", "b", "", "S3 bucket name (only for S3 storage)")

	scheduleCmd.MarkFlagRequired("username")
	scheduleCmd.MarkFlagRequired("password")
	scheduleCmd.MarkFlagRequired("dbname")

	return scheduleCmd
}

func UnscheduleCmd() *cobra.Command {
	var unscheduleCmd = &cobra.Command{
		Use:   "unschedule",
		Short: "Unschedule a backup task",
		Long:  `Unschedule a backup task using its job ID.`,
		Run: func(cmd *cobra.Command, args []string) {
			customLog.Info("Starting unschedule operation...")

			jobID, _ := cmd.Flags().GetInt64("id")

			// Convert int64 to cron.EntryID
			entryID := cron.EntryID(jobID)

			// Check if the job exists
			if _, exists := jobs[entryID]; !exists {
				customLog.Errorf("Job ID %d not found", jobID)
				return
			}

			// Remove the job from the cron scheduler
			c.Remove(entryID)

			// Remove the job from the jobs map
			delete(jobs, entryID)

			customLog.Infof("Unscheduled backup job with ID %d", jobID)
		},
	}

	unscheduleCmd.Flags().Int64P("id", "j", 0, "Job ID to unschedule")

	unscheduleCmd.MarkFlagRequired("id")

	return unscheduleCmd
}

func ListScheduleCommand() *cobra.Command {
	var listScheduleCmd = &cobra.Command{
		Use:   "list",
		Short: "List all scheduled backup jobs",
		Long:  `List all scheduled backup jobs with their IDs and cron expressions.`,
		Run: func(cmd *cobra.Command, args []string) {
			customLog.Info("Listing scheduled backup jobs...")

			if len(jobs) == 0 {
				customLog.Info("No scheduled jobs found.")
				return
			}

			for id, entry := range jobs {
				customLog.Infof("Job ID: %d, Cron Expression: %s", id, entry.Schedule)
			}
		},
	}

	return listScheduleCmd
}
