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

## Usage

## About guard

```bash
./guard
```

### Backup Command

```bash
./guard backup --dbms mysql --host localhost --port 3306 --username root --password secret --dbname mydb
```

#### Options

- `--dbms` : Type of the database (`mysql`, `postgres`, `mongodb`, `sqlite`).
- `--host` : Database host.
- `--port` : Database port.
- `--username` : Username for database access.
- `--password` : Password for database access.
- `--dbname` : Name of the database to back up.
- `--output(optional)` : Directory to save the backup file.

### Restore Command

```bash
./guard restore --dbms mysql --dbname mysql --host localhost --password secret --port 5432 --username root --file path/to/file
```

#### Options

- `--dbms` : Type of the database (`mysql`, `postgres`, `mongodb`, `sqlite`).
- `--host` : Database host.
- `--port` : Database port.
- `--username` : Username for database access.
- `--password` : Password for database access.
- `--dbname` : Name of the database to back up.
- `--file` : Path from where database will be restored

### Scheduling Backups

Use the `schedule` subcommand to automate backups:

```bash
./guard schedule --interval "0 2 * * *" --command "./guard backup ..."
```

### Unschedule command

Use the `unschedule` subcommand to unschedule the back with it's own id:

```bash
./guard unschedule --j
```

#### Options

- `j` : Job id

### List all Scheduled backups command

Use the `list` subcommand to view all the scheduled backups with their job id:

```bash
./guard list
```

### Slack Notifications(Upcoming)

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

Logs are stored in `logs/data-guard.log` by default. You can change the log path in the configuration file.

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
