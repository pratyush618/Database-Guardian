package tests

import (
	"context"
	"os"
	"testing"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/joho/godotenv"
)

func TestS3Config(t *testing.T) {
	// Load environment variables from .env file
	if err := godotenv.Load("../.env"); err != nil {
		t.Fatal("No .env file found or could not be loaded. Proceeding with existing environment variables.")
	}

	// Ensure required variables are set
	if os.Getenv("AWS_ACCESS_KEY_ID") == "" || os.Getenv("AWS_SECRET_ACCESS_KEY") == "" || os.Getenv("AWS_REGION") == "" {
		t.Fatal("AWS credentials or region not set. Ensure your .env file contains AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION.")
	}

	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithDefaultRegion("ap-south"))
	if err != nil {
		t.Fatalf("Error loading config: %v", err)
	}

	client := s3.NewFromConfig(cfg)

	// Get the first page of results for ListObjectsV2 for a bucket
	output, err := client.ListObjectsV2(context.TODO(), &s3.ListObjectsV2Input{
		Bucket: aws.String(os.Getenv("BUCKET_NAME")),
	})

	if err != nil {
		t.Fatalf("Error listing objectives: %v", err)
	}

	t.Log("first page results")
	for _, object := range output.Contents {
		t.Fatalf("key=%s size=%d", aws.ToString(object.Key), object.Size)
	}
}
