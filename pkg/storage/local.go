package storage

import (
	"os"
	"path/filepath"
)

// LocalStorage represents local storage
type LocalStorage struct {
	directory string
}

// NewLocalStorage creates a new local storage instance
func NewLocalStorage(directory string) (*LocalStorage, error) {
	if err := os.MkdirAll(directory, os.ModePerm); err != nil {
		customLog.Errorf("Failed to create local storage directory: %v", err)
		return nil, err
	}
	return &LocalStorage{
		directory: directory,
	}, nil
}

// UploadFile uploads a file to local storage
func (l *LocalStorage) UploadFile(filePath, objectKey string) error {
	destPath := filepath.Join(l.directory, objectKey)
	if err := os.Rename(filePath, destPath); err != nil {
		customLog.Errorf("Failed to move file %s to %s: %v", filePath, destPath, err)
		return err
	}
	customLog.Infof("Successfully stored file %s in local storage as %s", filePath, destPath)
	return nil
}

// DownloadFile downloads a file from local storage
func (l *LocalStorage) DownloadFile(objectKey, filePath string) error {
	srcPath := filepath.Join(l.directory, objectKey)
	data, err := os.ReadFile(srcPath)
	if err != nil {
		customLog.Errorf("Failed to read file %s from local storage: %v", srcPath, err)
		return err
	}
	if err := os.WriteFile(filePath, data, 0644); err != nil {
		customLog.Errorf("Failed to write file %s to %s: %v", srcPath, filePath, err)
		return err
	}
	customLog.Infof("Successfully downloaded file %s from local storage to %s", srcPath, filePath)
	return nil
}

// ListObjects lists objects in the local storage directory
func (l *LocalStorage) ListObjects() ([]string, error) {
	files, err := os.ReadDir(l.directory)
	if err != nil {
		customLog.Errorf("Failed to list files in local storage directory %s: %v", l.directory, err)
		return nil, err
	}

	var objects []string
	for _, file := range files {
		objects = append(objects, file.Name())
	}

	customLog.Infof("Listed %d files in local storage directory %s", len(objects), l.directory)
	return objects, nil
}
