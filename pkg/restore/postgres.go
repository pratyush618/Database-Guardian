package restore

import (
	"path/filepath"

	"github.com/Annany2002/guard/pkg/logger"
	"github.com/Annany2002/guard/pkg/utils"
)

var customLog = logger.NewLogger()

// RestorePostgres restores a PostgreSQL database from a backup file
func RestorePostgres(host, username, password, dbname, filePath, port string) error {
	customLog.Infof("Restoring PostgreSQL database %s from file %s", dbname, filePath)

	// Determine the file extension
	ext := filepath.Ext(filePath)
	if ext == ".gz" {
		return utils.RestoreGzFile(filePath, host, username, password, dbname, port)
	}
	err := utils.RestoreSqlFile(filePath, host, username, password, dbname, port)
	if err != nil {
		customLog.Fatal(err)
	}

	customLog.Infof("Successfully restored PostgreSQL database %s from file %s", dbname, filePath)
	return nil
}
