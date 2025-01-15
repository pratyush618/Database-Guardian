# Database Guardian

## Overview

The **Database Guardian** is a command-line interface (CLI) utility built in Go for backing up and restoring databases. It supports multiple database management systems (DBMS) such as MySQL, PostgreSQL, MongoDB, and SQLite. This tool allows users to schedule automatic backups, compress backup files, and store them locally or in the cloud. Additionally, it features logging and optional Slack notifications for backup activities.

## Features

### Database Connectivity

- **Supported DBMS**: MySQL, PostgreSQL, MongoDB, SQLite
- **Connection Parameters**: Specify host, port, username, password, and database name.
- **Connection Testing**: Validate database credentials before performing backup operations.

### Backup Operations

- **Backup Types**:
  - Full Backup
  - Incremental Backup
  - Differential Backup
- **Compression**: Compress backup files to save storage space.

### Storage Options

- **Local Storage**: Save backup files locally on your system.
- **Cloud Storage**:
  - AWS S3
  - Google Cloud Storage
  - Azure Blob Storage

### Logging and Notifications

- **Logging**: Track all backup activities, including start time, end time, status, and errors.
- **Notifications**: Send Slack notifications upon backup completion.

### Restore Operations

- Restore databases from backup files.
- Selectively restore specific tables or collections (if supported by the DBMS).

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
   cd db_backup_tool
   ```
3. Install dependencies:
   ```bash
   go mod tidy
   ```
4. Build the CLI:
   ```bash
   go build -o db_backup_tool ./cmd/main.go
   ```

## Usage

### Backup Command

```bash
./db_backup_tool backup --db-type mysql --host localhost --port 3306 --user root --password secret --db-name mydb --type full --output /backups
```

#### Options

- `--db-type` : Type of the database (`mysql`, `postgres`, `mongodb`, `sqlite`).
- `--host` : Database host.
- `--port` : Database port.
- `--user` : Username for database access.
- `--password` : Password for database access.
- `--db-name` : Name of the database to back up.
- `--type` : Backup type (`full`, `incremental`, `differential`).
- `--output` : Directory to save the backup file.

### Restore Command

```bash
./db_backup_tool restore --db-type postgres --backup-file /backups/mydb_backup.gz
```

#### Options

- `--db-type` : Type of the database.
- `--backup-file` : Path to the backup file.
- `--restore-tables` : (Optional) Comma-separated list of tables to restore.

### Scheduling Backups

Use the `schedule` subcommand to automate backups:

```bash
./db_backup_tool schedule --interval "0 2 * * *" --command "./db_backup_tool backup ..."
```

### Slack Notifications

To enable Slack notifications, set your Slack webhook URL in the environment variables:

```bash
export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
```

## Configuration

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

Logs are stored in `logs/backup.log` by default. You can change the log path in the configuration file.

## Testing

Run tests to ensure the tool works as expected:

```bash
cd tests
go test ./...
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to report bugs or suggest improvements.

## Contact

For any questions or feedback, feel free to contact annivish2002@gmail.com
