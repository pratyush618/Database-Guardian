"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";

export default function UpcomingExamples() {
  const examples = [
    {
      id: 1,
      title: "Basic Usage of guard",
      description: "Get information about the guard CLI tool.",
      command: "guard",
    },
    {
      id: 2,
      title: "Backup a Postgres Database",
      description: "Backup a postgres database using guard.",
      command:
        "guard backup --dbms pg --host localhost --port 5432 --username root --password secret --dbname mydb",
    },
    {
      id: 3,
      title: "Restore a Postgres Database",
      description: "Restore a Postgres database from a backup.",
      command:
        "guard restore --dbms pg --dbname mydb --host localhost --password secret --port 5432 --username root --file path/to/file",
    },
    {
      id: 4,
      title: "Schedule Automated Backups",
      description: "Automate backups using cron syntax.",
      command:
        'guard schedule --cron "0 2 * * *" --dbname db_name --username your_name --password my_password',
    },
    {
      id: 5,
      title: "Unschedule a Backup",
      description: "Remove a scheduled backup using its job ID.",
      command: "guard unschedule --j",
    },
    {
      id: 6,
      title: "List All Scheduled Backups",
      description: "View all scheduled backups and their job IDs.",
      command: "guard list",
    },
    {
      id: 7,
      title: "Help for Specific Commands",
      description: "Get detailed help for any guard command.",
      command: "guard command_name -h",
    },
  ];

  return (
    <>
      <Header />
      <div className="px-8 pt-6 space-y-6">
        <h1 className="text-3xl font-bold">Examples</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Card key={example.id}>
              <CardHeader>
                <CardTitle className="text-xl">{example.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{example.description}</p>
                <pre className="mt-4 p-2 bg-gray-100 rounded-md whitespace-pre-line">
                  $ {example.command}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
