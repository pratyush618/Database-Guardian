package storage

import (
	"context"
	"errors"
	"os"

	"github.com/Annany2002/guard/pkg/logger"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/joho/godotenv"
)

// S3Client represents an S3 client
type S3Client struct {
	client *s3.Client
	bucket string
}

var (
	customLog = logger.NewLogger()
)

func NewS3Client(bucketName string) (*S3Client, error) {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	// Ensure required variables are set
	if os.Getenv("AWS_ACCESS_KEY_ID") == "" || os.Getenv("AWS_SECRET_ACCESS_KEY") == "" || os.Getenv("AWS_REGION") == "" {
		return nil, errors.New("aws credentials or region not set. Ensure your .env file contains AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION")
	}

	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithDefaultRegion("ap-south-1"))
	if err != nil {
		return nil, err
	}

	// Create an S3 service client
	s3Client := s3.NewFromConfig(cfg)

	return &S3Client{
		client: s3Client,
		bucket: bucketName,
	}, nil
}

func (c *S3Client) UploadFileToS3(filePath, objectKey string) error {
	file, err := os.Open(filePath)
	if err != nil {
		customLog.Errorf("Failed to open file %s: %v", filePath, err)
		return err
	}
	defer file.Close()

	_, err = c.client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: aws.String(c.bucket),
		Key:    aws.String(objectKey),
		Body:   file,
	})
	if err != nil {
		customLog.Errorf("Failed to upload file %s to S3: %v", filePath, err)
		return err
	}

	customLog.Infof("Successfully uploaded file %s to S3 bucket %s as %s", filePath, c.bucket, objectKey)
	return nil
}
