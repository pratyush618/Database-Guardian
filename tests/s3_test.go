package tests

import (
	"fmt"
	"os"
	"testing"

	"github.com/Annany2002/guard/pkg/storage"
	"github.com/joho/godotenv"
)

func TestConfig(t *testing.T) {
	// Load environment variables from .env file
	if err := godotenv.Load("../.env"); err != nil {
		t.Fatal("No .env file found or could not be loaded.")
	}

	_, err := storage.NewS3Client(os.Getenv("BUCKET_NAME"))
	if err != nil {
		t.Fatalf("%v", err)
	}
}

func TestFileUpload(t *testing.T) {
	// Load environment variables from .env file
	err := godotenv.Load("../.env")
	if err != nil {
		t.Fatal("No .env file found or could not be loaded.")
	}

	bucketName := os.Getenv("BUCKET_NAME")
	filePath := os.Getenv("FILE_PATH")
	objectKey := os.Getenv("OBJECT_KEY")
	fileName := os.Getenv("FILE_NAME")
	objectKey = fmt.Sprintf("%s/%s", objectKey, fileName)

	// Ensure required variables are set
	if bucketName == "" {
		t.Fatal("Bucket name must not be empty")
	}

	s3Client, err := storage.NewS3Client(bucketName)
	if err != nil {
		t.Fatalf("%v", err)
	}

	err = s3Client.UploadFileToS3(filePath, objectKey)

	if err != nil {
		t.Fatalf("Error during file upload: %v", err)
	}
}
