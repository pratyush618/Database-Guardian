# Stage 1: Build the Go binary
FROM golang:1.23.4-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files for dependency management
COPY go.mod go.sum ./

# Download and cache dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the CLI tool
RUN go build -o guard

# Stage 2: Create the final image
FROM alpine:latest

# Install bash for interactive use
RUN apk add --no-cache bash

# Copy the guard binary from the builder stage
COPY --from=builder /app/guard /usr/local/bin/guard

# Set the working directory
WORKDIR /

# Set the entrypoint to bash for interactive use
ENTRYPOINT ["/bin/bash"]