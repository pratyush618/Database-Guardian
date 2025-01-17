package backup

import (
	"compress/gzip"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/Annany2002/Database-Guardian/pkg/utils"
	"github.com/JCoupalK/go-pgdump"
	"github.com/sirupsen/logrus"
)

func FullBackup(outputDir string) error {
	dbURL, err := utils.GenerateConnectionString()
	if err != nil {
		log.Fatal("DATABASE_URL environment variable not set")
	}

	// Create output directory
	if err := os.MkdirAll(outputDir, os.ModePerm); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}

	dbName := os.Getenv("DB_NAME")

	currTime := time.Now()

	// Create output file name
	dumpFileName := filepath.Join(outputDir, fmt.Sprintf("%s-%s.sql", dbName, currTime.Format("20060102T150405")))

	// Opening the file for write
	file, err := os.Create(dumpFileName)
	if err != nil {
		return fmt.Errorf("failed to create dump file: %w", err)
	}
	defer file.Close()

	// Create a gzip writer
	gzipWriter := gzip.NewWriter(file)
	defer gzipWriter.Close()

	// Create a new dumper instance
	dumper := pgdump.NewDumper(dbURL, 5)

	if err := dumper.DumpDatabase(dumpFileName, &pgdump.TableOptions{}); err != nil {
		os.Remove(dumpFileName) // Cleanup on failure
		return fmt.Errorf("error dumping database: %w", err)
	}

	logrus.WithField("file", dumpFileName).Info("Backup successfully saved")
	return nil
}
