# Database Guardian

## Overview

The **Database Guardian** is a command-line interface (CLI) utility built in Go for backing up and restoring databases. It supports multiple database management systems (DBMS) such as MySQL, PostgreSQL, MongoDB, and SQLite. This tool allows users to schedule automatic backups, compress backup files, and store them locally or in the cloud. Additionally, it features logging and optional Slack notifications for backup activities.

## Features

### Database Connectivity

- **Supported DBMS**: PostgreSQL
- **Connection Parameters**: Specify host, port, username, password, and database name.
- **Connection Testing**: Validate database credentials before performing backup operations.

### Backup Operations

- **Backup Types**:
  - Full Backup
  - Incremental Backup (Upcoming)
  - Differential Backup (Upcoming)
- **Compression**: Compress backup files to save storage space.

### Storage Options

- **Local Storage**: Save backup files locally on your system.
- **Cloud Storage**:
  - AWS S3
  - Google Cloud Storage (upcoming)
  - Azure Blob Storage (coming)

### Logging and Notifications

- **Logging**: Track all backup activities, including start time, end time, status, and errors.
- **Notifications** (upcoming): Send Slack notifications upon backup completion.

### Restore Operations

- Restore databases from backup files.
- Selectively restore specific tables or collections (upcoming).

### Automatic Scheduling

- Schedule backups using cron jobs.

## Installation

### Prerequisites

- [Go](https://golang.org/doc/install) (1.18 or later)
- Database client tools (e.g., `mysqldump`, `pg_dump`, `mongodump` for respective DBMS)
- Cloud SDKs for cloud storage integrations

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Annany2002/Data-Guardian.git
   ```
2. Navigate to the project directory:
   ```bash
   cd data_guardian
   ```
3. Install dependencies:
   ```bash
   go mod tidy
   ```
4. Build the CLI:
   ```bash
   go build .
   ```

## **Run Database Guardian Using Docker**

Run the **Database Guardia CLI** tool using Docker without needing to install Go or any dependencies locally.

### **Prerequisites**

- Docker installed on your machine. [Install Docker](https://docs.docker.com/get-docker/).

---

### **Run Database Guardian CLI**

1. Pull the Docker image from Docker Hub:

   ```bash
   docker pull annany/guard:1.0
   ```

2. Run the image interactively:

   ```bash
   docker run --rm -it annany/guard:1.0 /bin/bash
   ```

   - This will start a shell inside the container where you can run `guard` commands. Note that when you'll exit the container, it will be deleted.
   - If you want your container to **persist** even after you exit the interactive Bash session, you should run it in **detached mode** (-d) without the --rm flag.

   ```bash
       docker run -dit --name guard-container annany/guard:1.0 /bin/bash
   ```

3. Reattach to the container:

You can reattach to the running/stopped container using:

```bash
docker start -ai guard-container  # Start and attach
```

**or**

```bash
docker exec -it guard-container /bin/bash  # Open a new Bash session inside
```

4. Persist Logs:

By default, Docker saves container logs, and you can view them with:

    ```bash
    docker logs -f guard-container  # Follow logs in real-time
    ```

If you want to persist logs to a file on your host machine, mount a volume:

    ```bash
    docker run -dit --name guard-container -v $(pwd)/logs:/var/log annany/guard:1.0 /bin/bash
    ```

- This saves logs inside logs/ on your machine.

5. Persist Data Using Volumes

- If guard generates files, save them outside the container using a named volume:

      ```bash
      docker run -dit --name guard-container -v guard-data:/app/data annany/guard:1.0 /bin/bash
      ```

  The guard-data volume persists even if the container is removed.

- Later, you can find the data using:

  ```bash
  docker volume inspect guard-data
  ```

- If you want to store data in a specific host folder:

      ```bash
      docker run -dit --name guard-container -v $(pwd)/data:/app/data annany/guard:1.0 /bin/bash
      ```

  This ensures data is accessible at ./data on your host machine.

![image](https://github.com/user-attachments/assets/b97f9e05-53de-4001-ad22-41fe22ba895f)

---

### **Build the Docker Image Locally**

If you want to build the Docker image yourself:

1. Clone this repository:
   ```bash
   git clone https://github.com/Annany2002/Database-Guardian.git
   cd Database Guardian
   ```
2. Build the image:
   ```bash
   docker build -t annany/guard:1.0 .
   ```
3. Run the container:
   ```bash
   docker run --rm annany/guard:1.0
   ```

---

### **Docker Hub**

The pre-built image is available on Docker Hub:  
[**annany/guard**](https://hub.docker.com/r/annany/guard)

### Slack Notifications(Upcoming)

To enable Slack notifications, set your Slack webhook URL in the environment variables:

```bash
export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
```

## Configuration(Upcoming)

You can configure default settings in `config/config.yaml`:

```yaml
mysql:
  host: localhost
  port: 3306
  user: root
  password: secret
  db_name: mydb

storage:
  local: /backups
  cloud: aws

aws:
  bucket: your-bucket-name
  region: us-west-1
```

## Logging

Logs are stored in `logs/guard.log` by default. You can change the log path in the configuration file.

## Testing

Run tests to ensure the tool works as expected:

```bash
cd tests
go test ./...
```

## Note

The version 1 of guard will only contain **postgres** databse for all features, with time the rest dbms's will be added.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to report bugs or suggest improvements.

## Contact

For any questions or feedback, feel free to contact shazam6061@gmail.com
