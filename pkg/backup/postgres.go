package backup

import (
	"compress/gzip"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/Annany2002/guard/pkg/logger"
	"github.com/Annany2002/guard/pkg/utils"
	"github.com/JCoupalK/go-pgdump"
)

var (
	customLog = logger.NewLogger()
)

func FullBackup(db_name, db_password, db_user, db_host, outputDir string, db_port int) error {
	dbURL, err := utils.GenerateConnectionString(db_name, db_password, db_user, db_host, db_port)
	if err != nil {
		customLog.Fatal("All environment variables not set")
		return err
	}

	// Create output directory
	if err := os.MkdirAll(outputDir, os.ModePerm); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}

	currTime := time.Now()

	// Create output file name
	dumpFileName := filepath.Join(outputDir, fmt.Sprintf("%s-%s.sql", db_name, currTime.Format("20060102T150405")))

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
	dumper := pgdump.NewDumper(dbURL, 8)

	if err := dumper.DumpDatabase(dumpFileName, &pgdump.TableOptions{}); err != nil {
		os.Remove(dumpFileName) // Cleanup on failure
		return fmt.Errorf("error dumping database: %w", err)
	}

	customLog.Info("Backup successfully saved")
	return nil
}
