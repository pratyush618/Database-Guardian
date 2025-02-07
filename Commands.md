# This file lists all the commands that are availabe in guard

## Usage

## About guard

```bash
guard
```

### Backup Command

```bash
guard backup --dbms mysql --host localhost --port 3306 --username root --password secret --dbname mydb
```

#### Options

- `--dbms` : Type of the database (`mysql`, `postgres`, `mongodb`, `sqlite`), default is postgres.
- `--host` : Database host.
- `--port` : Database port.
- `--username` : Username for database access.
- `--password` : Password for database access.
- `--dbname` : Name of the database to back up.
- `--output(optional)` : Directory to save the backup file.

### Restore Command

```bash
guard restore --dbms mysql --dbname mysql --host localhost --password secret --port 5432 --username root --file path/to/file
```

#### Options

- `--dbms` : Type of the database (`mysql`, `postgres`, `mongodb`, `sqlite`), default is postgres.
- `--host` : Database host.
- `--port` : Database port.
- `--username` : Username for database access.
- `--password` : Password for database access.
- `--dbname` : Name of the database to back up.
- `--file` : Path from where database will be restored

### Scheduling Backups

Use the `schedule` subcommand to automate backups:

```bash
guard schedule --interval "0 2 * * *" --command "./guard backup ..."
```

### Unschedule command

Use the `unschedule` subcommand to unschedule the back with it's own id:

```bash
guard unschedule --j
```

#### Options

- `j` : Job id

### List all Scheduled backups command

Use the `list` subcommand to view all the scheduled backups with their job id:

```bash
guard list
```

### To know more about specific command

```bash
guard command_name -h
```
