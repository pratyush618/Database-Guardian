import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Book, Github } from "lucide-react";
import Layout from "@/components/Layout";

const DocsPage = () => {
  return (
    <Layout>
      <div className="px-12 py-8">
        <div className="flex gap-16 justify-center">
          {/* Sidebar navigation */}
          <aside className="hidden border-r-2 p-2 max-w-[22rem] lg:block">
            <div className="sticky top-24 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-120px)] pr-6">
                <nav className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">
                      Getting Started
                    </h3>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="/docs#overview"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Overview
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/docs#installation"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Installation
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/docs#docker"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Docker Setup
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">
                      Core Concepts
                    </h3>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="/docs#backup"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Backup Operations
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/docs#restore"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Restore Operations
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/docs#scheduling"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Scheduling
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/docs#storage"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Storage Options
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Reference</h3>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="/docs#commands"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Command Reference
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/docs#configuration"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Configuration
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/docs#logging"
                          className="text-sm block py-1 text-muted-foreground hover:text-foreground"
                        >
                          Logging
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </ScrollArea>
            </div>
          </aside>

          {/* Main content */}
          <div className="px-2">
            <section id="overview" className="mb-16">
              <h1 className="text-4xl font-bold mb-6">Database Guardian</h1>
              <p className="text-lg text-muted-foreground mb-8">
                A powerful command-line utility for backing up and restoring
                multiple database types.
              </p>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-3xl">
                <Card>
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <Database className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">
                      Multiple Database Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Database Guardian supports PostgreSQL, with MySQL,
                      MongoDB, and SQLite support coming soon.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Secure Backups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Create compressed, secure backups for local and cloud
                      storage to protect your data.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div> */}

              <div className="prose dark:prose-invert max-w-md">
                <h2
                  id="features"
                  className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24"
                >
                  Features
                </h2>
                <ul className="space-y-1 list-disc">
                  <li>
                    <strong>Database Connectivity:</strong> Connect to
                    PostgreSQL (MySQL, MongoDB, and SQLite coming soon)
                  </li>
                  <li>
                    <strong>Backup Operations:</strong> Full Backup with
                    compression
                  </li>
                  <li>
                    <strong>Storage Options:</strong> Local storage and AWS S3
                    (Google Cloud Storage and Azure Blob Storage coming soon)
                  </li>
                  <li>
                    <strong>Restore Operations:</strong> Restore databases from
                    backup files
                  </li>
                  <li>
                    <strong>Automatic Scheduling:</strong> Schedule backups
                    using cron jobs
                  </li>
                  <li>
                    <strong>Logging:</strong> Track all backup activities
                  </li>
                </ul>
              </div>
            </section>

            <section id="installation" className="mb-12">
              <div className="prose space-y-1 dark:prose-invert max-w-md">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Installation
                </h2>

                <h3 className="text-lg font-semibold">Prerequisites</h3>
                <ul className="space-y-1 list-disc">
                  <li>Go (1.18 or later)</li>
                  <li>Database client tools (e.g., pg_dump for PostgreSQL)</li>
                  <li>Cloud SDKs for cloud storage integrations</li>
                </ul>
                <h3 className="font-semibold">Steps</h3>
                <pre>
                  <code className="language-bash whitespace-pre-wrap">
                    {`$ git clone https://github.com/Annany2002/Database-Guardian.git
$ cd data_guardian
$ go mod tidy
$ go build .`}
                  </code>
                </pre>
              </div>
            </section>

            <section id="docker" className="mb-16">
              <div className="prose dark:prose-invert">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Docker Setup
                </h2>
                <p>
                  Run the Database Guardian CLI tool using Docker without
                  needing to install Go or any dependencies locally.
                </p>

                <h3 className="font-semibold text-lg mt-2">Prerequisites</h3>
                <ul className="list-disc">
                  <li>Docker installed on your machine</li>
                </ul>

                <h3 className="font-semibold text-lg mt-2">
                  Run Database Guardian CLI
                </h3>
                <pre>
                  <code className="language-bash whitespace-pre-wrap">
                    {`$ docker pull annany/guard:latest
$ docker run --rm -it annany/guard:latest /bin/bash
$ docker run -dit --name guard-container annany/guard:latest /bin/bash`}
                  </code>
                </pre>

                <h3 className="font-semibold text-lg mt-2">
                  Persist Data Using Volumes
                </h3>
                <pre>
                  <code className="language-bash whitespace-pre-wrap">
                    {`$ docker run -dit --name guard-container -v guard-data:/app/data annany/guard:latest /bin/bash
$ docker run -dit --name guard-container -v $(pwd)/data:/app/data annany/guard:latest /bin/bash`}
                  </code>
                </pre>
              </div>
            </section>

            <section id="commands" className="mb-16">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Command Reference
                </h2>

                <Tabs defaultValue="backup">
                  <TabsList>
                    <TabsTrigger value="backup">Backup</TabsTrigger>
                    <TabsTrigger value="restore">Restore</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                    <TabsTrigger value="other">Other</TabsTrigger>
                  </TabsList>

                  <TabsContent value="backup" className="mt-4">
                    <h3 className="font-semibold text-lg mt-2">
                      Backup Command
                    </h3>
                    <pre>
                      <code className="language-bash whitespace-pre-wrap">
                        $ guard backup --dbms mysql --host localhost --port 3306
                        --username root --password secret --dbname mydb
                      </code>
                    </pre>

                    <h4 className="font-semibold text-base mt-2">Options</h4>
                    <ul>
                      <li>
                        <code>--dbms</code>: Type of the database (mysql,
                        postgres, mongodb, sqlite), default is postgres
                      </li>
                      <li>
                        <code>--host</code>: Database host
                      </li>
                      <li>
                        <code>--port</code>: Database port
                      </li>
                      <li>
                        <code>--username</code>: Username for database access
                      </li>
                      <li>
                        <code>--password</code>: Password for database access
                      </li>
                      <li>
                        <code>--dbname</code>: Name of the database to back up
                      </li>
                      <li>
                        <code>--output</code>: (Optional) Directory to save the
                        backup file
                      </li>
                    </ul>
                  </TabsContent>

                  <TabsContent value="restore" className="mt-4">
                    <h3 className="font-semibold text-lg mt-2">
                      Restore Command
                    </h3>
                    <pre>
                      <code className="language-bash whitespace-pre-wrap">
                        $ guard restore --dbms mysql --dbname mysql --host
                        localhost --password secret --port 5432 --username root
                        --file path/to/file
                      </code>
                    </pre>

                    <h4 className="font-semibold text-base mt-2">Options</h4>
                    <ul>
                      <li>
                        <code>--dbms</code>: Type of the database (mysql,
                        postgres, mongodb, sqlite), default is postgres
                      </li>
                      <li>
                        <code>--host</code>: Database host
                      </li>
                      <li>
                        <code>--port</code>: Database port
                      </li>
                      <li>
                        <code>--username</code>: Username for database access
                      </li>
                      <li>
                        <code>--password</code>: Password for database access
                      </li>
                      <li>
                        <code>--dbname</code>: Name of the database to restore
                        to
                      </li>
                      <li>
                        <code>--file</code>: Path from where database will be
                        restored
                      </li>
                    </ul>
                  </TabsContent>

                  <TabsContent value="schedule" className="mt-4">
                    <h3 className="font-semibold text-lg mt-2">
                      Schedule Command
                    </h3>
                    <pre>
                      <code className="language-bash whitespace-pre-wrap">
                        $ guard schedule --cron &quot;0 2 * * *&quot; --dbname
                        db_name --username your_name --password my_password
                      </code>
                    </pre>

                    <h4 className="font-semibold text-base mt-2">Options</h4>
                    <ul>
                      <li>
                        <code>--cron</code>: Cron expression for scheduling
                      </li>
                      <li>
                        <code>--dbms</code>: Type of the database (mysql,
                        postgres, mongodb, sqlite), default is postgres
                      </li>
                      <li>
                        <code>--host</code>: Database host
                      </li>
                      <li>
                        <code>--port</code>: Database port
                      </li>
                      <li>
                        <code>--username</code>: Username for database access
                      </li>
                      <li>
                        <code>--password</code>: Password for database access
                      </li>
                      <li>
                        <code>--dbname</code>: Name of the database to back up
                      </li>
                    </ul>
                  </TabsContent>

                  <TabsContent value="other" className="mt-4">
                    <h3 className="font-semibold text-lg mt-2">List Command</h3>
                    <p>
                      Use the <code>list</code> subcommand to view all the
                      scheduled backups with their job id:
                    </p>
                    <pre>
                      <code className="language-bash whitespace-pre-wrap">
                        $ guard list
                      </code>
                    </pre>

                    <h3 className="font-semibold text-lg mt-2">
                      Unschedule Command
                    </h3>
                    <p>
                      Use the <code>unschedule</code> subcommand to unschedule
                      the back with it&apos;s own id:
                    </p>
                    <pre>
                      <code className="language-bash whitespace-pre-wrap">
                        $ guard unschedule --j job_id
                      </code>
                    </pre>

                    <h4 className="font-semibold text-base mt-2">Options</h4>
                    <ul>
                      <li>
                        <code>--j</code>: Job id
                      </li>
                    </ul>

                    <h3 className="font-semibold text-lg mt-2">Help Command</h3>
                    <p>To know more about specific command:</p>
                    <pre>
                      <code className="language-bash whitespace-pre-wrap">
                        $ guard command_name -h
                      </code>
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>
            </section>

            <section id="backup" className="mb-16">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Backup Operations
                </h2>
                <p>
                  Database Guardian provides robust backup capabilities for your
                  database. Currently, the tool supports full backups for
                  PostgreSQL databases, with incremental and differential backup
                  support coming in future releases.
                </p>

                <h3 className="font-semibold text-lg mt-2">Backup Types</h3>
                <ul className="list-disc">
                  <li>
                    <strong>Full Backup</strong>: Creates a complete copy of
                    your database
                  </li>
                  <li>
                    <strong>Incremental Backup</strong> (Upcoming): Only backs
                    up data that changed since the last backup
                  </li>
                  <li>
                    <strong>Differential Backup</strong> (Upcoming): Backs up
                    all changes since the last full backup
                  </li>
                </ul>

                <h3 className="font-semibold text-lg mt-2">Compression</h3>
                <p>
                  All backups are automatically compressed to save storage
                  space. This is particularly useful when backing up large
                  databases or when storing backups in cloud storage with
                  limited capacity.
                </p>

                <h3 className="font-semibold text-lg mt-2">
                  Example Backup Command
                </h3>
                <pre className="whitespace-pre-line">
                  <code className="language-bash whitespace-pre-wrap">
                    $ guard backup --dbms postgres --host localhost --port 5432
                    --username postgres --password securepass --dbname
                    my_database --output /path/to/backups
                  </code>
                </pre>
              </div>
            </section>

            <section id="restore" className="mb-16">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Restore Operations
                </h2>
                <p>
                  Database Guardian makes it easy to restore your databases from
                  previously created backups. This is crucial for disaster
                  recovery or when migrating to a new server.
                </p>

                <h3 className="font-semibold text-lg mt-2">Basic Restore</h3>
                <p>
                  To restore a database from a backup file, use the{" "}
                  <code>restore</code> command with the path to your backup
                  file:
                </p>
                <pre className="whitespace-pre-line">
                  <code className="language-bash whitespace-pre-wrap">
                    $ guard restore --dbms postgres --host localhost --port 5432
                    --username postgres --password securepass --dbname
                    my_database --file /path/to/backup_file.sql
                  </code>
                </pre>

                <h3 className="font-semibold text-lg mt-2">
                  Selective Restore
                </h3>
                <p>
                  In upcoming versions, Database Guardian will support
                  selectively restoring specific tables or collections, allowing
                  for more granular control over the restore process.
                </p>
              </div>
            </section>

            <section id="scheduling" className="mb-16">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Scheduling Backups
                </h2>
                <p>
                  Automation is key to a reliable backup strategy. Database
                  Guardian allows you to schedule backups using cron jobs,
                  ensuring your data is backed up regularly without manual
                  intervention.
                </p>

                <h3 className="font-semibold text-lg mt-2">
                  Creating a Scheduled Backup
                </h3>
                <p>
                  To schedule a backup, use the <code>schedule</code> command
                  with a cron expression:
                </p>
                <pre className="whitespace-pre-line mb-2">
                  <code className="language-bash whitespace-pre-wrap">
                    $ guard schedule --cron &quot;0 2 * * *&quot; --dbms
                    postgres --host localhost --port 5432 --username postgres
                    --password securepass --dbname my_database
                  </code>
                </pre>
                <p>This example schedules a backup every day at 2:00 AM.</p>

                <h3 className="font-semibold text-lg mt-2">
                  Common Cron Expressions
                </h3>
                <ul className="list-disc">
                  <li>
                    <code>0 2 * * *</code> : Every day at 2:00 AM
                  </li>
                  <li>
                    <code>0 */6 * * *</code> : Every 6 hours
                  </li>
                  <li>
                    <code>0 0 * * 0</code> : Every Sunday at midnight
                  </li>
                  <li>
                    <code>0 0 1 * *</code> : First day of every month at
                    midnight
                  </li>
                </ul>

                <h3 className="font-semibold text-lg mt-2">
                  Managing Scheduled Backups
                </h3>
                <p>To view all scheduled backups:</p>
                <pre>
                  <code className="language-bash whitespace-pre-wrap">
                    $ guard list
                  </code>
                </pre>

                <p className="mt-2">To remove a scheduled backup:</p>
                <pre>
                  <code className="language-bash whitespace-pre-wrap">
                    $ guard unschedule --j job_id
                  </code>
                </pre>
              </div>
            </section>

            <section id="storage" className="mb-16">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Storage Options
                </h2>
                <p>
                  Database Guardian provides multiple options for storing your
                  backup files, allowing for flexibility and redundancy in your
                  backup strategy.
                </p>

                <h3 className="font-semibold text-lg mt-2">Local Storage</h3>
                <p>
                  By default, backups are stored locally in the system. You can
                  specify the output directory using the <code>--output</code>{" "}
                  flag:
                </p>
                <pre className="whitespace-pre-line">
                  <code className="language-bash whitespace-pre-wrap">
                    $ guard backup --dbms postgres --host localhost --port 5432
                    --username postgres --password securepass --dbname
                    my_database --output /path/to/backups
                  </code>
                </pre>

                <h3 className="font-semibold text-lg mt-2">Cloud Storage</h3>
                <p>
                  Database Guardian supports storing backups in cloud storage
                  providers for added security and accessibility:
                </p>

                <h4 className="font-medium">- AWS S3</h4>
                <p>
                  Currently supported for storing backups in Amazon S3 buckets.
                </p>

                <h4 className="mt-2 text-gray-600 font-semibold">
                  Coming Soon
                </h4>
                <ul>
                  <li>- Google Cloud Storage</li>
                  <li>- Azure Blob Storage</li>
                </ul>
              </div>
            </section>

            <section id="configuration" className="mb-16">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Configuration
                </h2>
                <p>
                  Database Guardian will support configuration through a YAML
                  file in future releases, allowing you to set default values
                  for common settings.
                </p>

                <h3 className="font-semibold text-lg mt-2">
                  Example Configuration (Upcoming)
                </h3>
                <pre className="bg-gray-100 p-3 rounded-md">
                  <code className="language-yaml">
                    {`mysql:
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
  region: us-west-1`}
                  </code>
                </pre>
              </div>
            </section>

            <section id="logging" className="mb-16">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-xl mb-2 text-gray-900 underline underline-offset-2 font-bold scroll-mt-24">
                  Logging
                </h2>
                <p>
                  Database Guardian provides comprehensive logging to help you
                  monitor and troubleshoot backup and restore operations.
                </p>

                <h3 className="font-semibold text-lg mt-2">Log Location</h3>
                <p>
                  Logs are stored in <code>logs/guard.log</code> by default. The
                  log path will be configurable in future releases.
                </p>

                <h3 className="font-semibold text-lg mt-2">Log Information</h3>
                <p>The logs include the following information:</p>
                <ul className="list-disc">
                  <li>Start time of operations</li>
                  <li>End time of operations</li>
                  <li>Operation status (success or failure)</li>
                  <li>Error messages (if any)</li>
                  <li>Database connection details</li>
                </ul>
              </div>
            </section>

            <div className="mt-16 border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Need More Help?</h3>
              <p className="text-muted-foreground mb-6">
                If you have questions or need further assistance, check out
                these resources:
              </p>
              <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                <Link href="https://github.com/Annany2002/Database-Guardian">
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" /> GitHub Repository
                  </Button>
                </Link>
                <Link href="/examples">
                  <Button variant="outline">
                    <Book className="mr-2 h-4 w-4" /> Examples
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocsPage;
