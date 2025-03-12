import { NextPage } from "next";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import CommandCard from "@/components/CommandCard";

interface CommandOption {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
}

interface CommandExample {
  description: string;
  command: string;
}

interface CommandDetails {
  name: string;
  description: string;
  usage: string;
  options: CommandOption[];
  examples: CommandExample[];
}

const CommandsPage: NextPage = () => {
  // Sample data for commands
  const backupCommand: CommandDetails = {
    name: "backup",
    description: "Backs up a database to a file",
    usage:
      "guard backup --dbms postgres --host localhost --port 5432 --username postgres --password secret --dbname mydb [--output /path/to/dir]",
    options: [
      {
        name: "--dbms",
        description: "Type of the database",
        required: true,
        defaultValue: "postgres",
      },
      {
        name: "--host",
        description: "Database host",
        required: true,
        defaultValue: "localhost",
      },
      { name: "--port", description: "Database port", required: true },
      {
        name: "--username",
        description: "Username for database access",
        required: true,
      },
      {
        name: "--password",
        description: "Password for database access",
        required: true,
      },
      {
        name: "--dbname",
        description: "Name of the database to back up",
        required: true,
      },
      {
        name: "--output",
        description: "Directory to save the backup file",
        required: false,
      },
    ],
    examples: [
      {
        description: "Basic backup of a PostgreSQL database:",
        command:
          "guard backup --dbms postgres --host localhost --port 5432 --username postgres --password secret --dbname mydb",
      },
      {
        description: "Backup with custom output location:",
        command:
          "guard backup --dbms postgres --host localhost --port 5432 --username postgres --password secret --dbname mydb --output /backups/postgres",
      },
    ],
  };

  const restoreCommand: CommandDetails = {
    name: "restore",
    description: "Restores a database from a backup file",
    usage:
      "guard restore --dbms postgres --host localhost --port 5432 --username postgres --password secret --dbname mydb --file /path/to/backup",
    options: [
      {
        name: "--dbms",
        description: "Type of the database",
        required: true,
        defaultValue: "postgres",
      },
      {
        name: "--host",
        description: "Database host",
        required: true,
        defaultValue: "localhost",
      },
      { name: "--port", description: "Database port", required: true },
      {
        name: "--username",
        description: "Username for database access",
        required: true,
      },
      {
        name: "--password",
        description: "Password for database access",
        required: true,
      },
      {
        name: "--dbname",
        description: "Name of the database to restore to",
        required: true,
      },
      {
        name: "--file",
        description: "Path to the backup file",
        required: true,
      },
    ],
    examples: [
      {
        description: "Restore a PostgreSQL database from a backup file:",
        command:
          "guard restore --dbms postgres --host localhost --port 5432 --username postgres --password secret --dbname mydb --file /backups/mydb_20240312.sql",
      },
    ],
  };

  const scheduleCommand: CommandDetails = {
    name: "schedule",
    description: "Schedules automatic database backups using cron expressions",
    usage:
      'guard schedule --cron "0 2 * * *" --dbms postgres --host localhost --port 5432 --username postgres --password secret --dbname mydb',
    options: [
      {
        name: "--cron",
        description:
          'Cron expression for scheduling (e.g., "0 2 * * *" for daily at 2:00 AM)',
        required: true,
      },
      {
        name: "--dbms",
        description: "Type of the database",
        required: true,
        defaultValue: "postgres",
      },
      {
        name: "--host",
        description: "Database host",
        required: true,
        defaultValue: "localhost",
      },
      { name: "--port", description: "Database port", required: true },
      {
        name: "--username",
        description: "Username for database access",
        required: true,
      },
      {
        name: "--password",
        description: "Password for database access",
        required: true,
      },
      {
        name: "--dbname",
        description: "Name of the database to back up",
        required: true,
      },
    ],
    examples: [
      {
        description: "Schedule daily backups at 2:00 AM:",
        command:
          'guard schedule --cron "0 2 * * *" --dbms postgres --host localhost --port 5432 --username postgres --password secret --dbname mydb',
      },
      {
        description: "Schedule weekly backups on Sunday at midnight:",
        command:
          'guard schedule --cron "0 0 * * 0" --dbms postgres --host localhost --port 5432 --username postgres --password secret --dbname mydb',
      },
    ],
  };

  const listCommand: CommandDetails = {
    name: "list",
    description: "Lists all scheduled backup jobs",
    usage: "guard list",
    options: [],
    examples: [
      {
        description: "List all scheduled backup jobs:",
        command: "guard list",
      },
    ],
  };

  const unscheduleCommand: CommandDetails = {
    name: "unschedule",
    description: "Removes a scheduled backup job",
    usage: "guard unschedule --j job_id",
    options: [
      {
        name: "--j",
        description: "Job ID of the scheduled backup to remove",
        required: true,
      },
    ],
    examples: [
      {
        description: "Remove a scheduled backup job:",
        command: "guard unschedule --j job123",
      },
    ],
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Command Reference</h1>
          <p className="text-lg text-muted-foreground">
            Complete reference documentation for all Database Guardian commands.
          </p>
        </div>

        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Command options are case-sensitive. Be sure to type them exactly as
            shown.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="backup" className="mb-8">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="restore">Restore</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="unschedule">Unschedule</TabsTrigger>
          </TabsList>

          <TabsContent value="backup">
            <CommandCard command={backupCommand} />
          </TabsContent>

          <TabsContent value="restore">
            <CommandCard command={restoreCommand} />
          </TabsContent>

          <TabsContent value="schedule">
            <CommandCard command={scheduleCommand} />
          </TabsContent>

          <TabsContent value="list">
            <CommandCard command={listCommand} />
          </TabsContent>

          <TabsContent value="unschedule">
            <CommandCard command={unscheduleCommand} />
          </TabsContent>
        </Tabs>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Global Options</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Option</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono text-sm">--help, -h</TableCell>
                <TableCell>Display help information for any command</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono text-sm">
                  --version, -v
                </TableCell>
                <TableCell>Display version information</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Common Patterns</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Getting Help</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You can get help for any command using the -h or --help flag:
                </p>
                <pre className="bg-slate-950 text-slate-50 p-3 rounded-md overflow-x-auto text-sm">
                  <code>guard backup -h</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Checking Command Syntax
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Always check the syntax for a command before running it to
                  ensure all required parameters are provided:
                </p>
                <pre className="bg-slate-950 text-slate-50 p-3 rounded-md overflow-x-auto text-sm">
                  <code>guard command_name -h</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-8">
            Visit our GitHub repository for more examples, issue reporting, and
            contributions.
          </p>
          <Link
            href="https://github.com/Annany2002/Database-Guardian"
            className="text-primary hover:underline"
          >
            GitHub Repository
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CommandsPage;
