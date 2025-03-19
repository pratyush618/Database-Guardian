import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import CodeBlock from "./CodeBlock";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

export default function InstallationAndCommands() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Installation & Commands
      </h2>

      <Tabs defaultValue="installation">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="docker">via Docker</TabsTrigger>
          <TabsTrigger value="commands">Commands</TabsTrigger>
        </TabsList>

        <TabsContent value="installation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Installation Steps</CardTitle>
              <CardDescription>
                Get started with Database Guardian by following these steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Prerequisites</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Go (1.18 or later)</li>
                <li>Database client tools (e.g., pg_dump for PostgreSQL)</li>
                <li>Cloud SDKs for cloud storage integrations</li>
              </ul>

              <h3 className="text-lg font-semibold mb-4">Steps</h3>
              <CodeBlock
                title="Clone the repository"
                code="git clone https://github.com/Annany2002/Database-Guardian.git"
              />

              <CodeBlock
                title="Navigate to the project directory"
                code="cd database_guardian"
              />

              <CodeBlock title="Install dependencies" code="go mod tidy" />

              <CodeBlock title="Build the CLI" code="go build ." />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docker" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Docker Usage</CardTitle>
              <CardDescription>
                Run Database Guardian using Docker without installing Go locally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Prerequisites</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Docker installed on your machine</li>
              </ul>

              <h3 className="text-lg font-semibold mb-4">
                Running Database Guardian with Docker
              </h3>

              <CodeBlock
                title="Pull the Docker image"
                code="docker pull annany/guard:latest"
              />

              <CodeBlock
                title="Run the image interactively"
                code="docker run --rm -it annany/guard:latest /bin/bash"
              />

              <CodeBlock
                title="Run in detached mode (to persist)"
                code="docker run -dit --name guard-container annany/guard:latest /bin/bash"
              />

              <h3 className="text-lg font-semibold mb-4 mt-6">
                Persist Data Using Volumes
              </h3>

              <CodeBlock
                title="Using a named volume"
                code="docker run -dit --name guard-container -v guard-data:/app/data annany/guard:latest /bin/bash"
              />

              <CodeBlock
                title="Using a host directory"
                code="docker run -dit --name guard-container -v $(pwd)/data:/app/data annany/guard:latest /bin/bash"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link
                target="_blank"
                href="https://hub.docker.com/r/annany/guard"
              >
                <Button variant="link">View Docker Hub</Button>
              </Link>
              {/* <Button>Next: Commands</Button> */}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="commands" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Command Reference</CardTitle>
              <CardDescription>
                Complete list of Database Guardian commands and options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Backup Command</h3>
              <CodeBlock code="guard backup --dbms mysql --host localhost --port 3306 --username root --password secret --dbname mydb" />

              <h4 className="font-medium mt-4 mb-2">Options</h4>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                <li>
                  <code className="text-primary">--dbms</code>: Type of the
                  database (mysql, postgres, mongodb, sqlite)
                </li>
                <li>
                  <code className="text-primary">--host</code>: Database host
                </li>
                <li>
                  <code className="text-primary">--port</code>: Database port
                </li>
                <li>
                  <code className="text-primary">--username</code>: Username for
                  database access
                </li>
                <li>
                  <code className="text-primary">--password</code>: Password for
                  database access
                </li>
                <li>
                  <code className="text-primary">--dbname</code>: Name of the
                  database to back up
                </li>
                <li>
                  <code className="text-primary">--output</code>: (Optional)
                  Directory to save the backup file
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-4">Restore Command</h3>
              <CodeBlock code="guard restore --dbms mysql --dbname mysql --host localhost --password secret --port 5432 --username root --file path/to/file" />

              <h3 className="text-lg font-semibold mb-4 mt-6">
                Schedule Command
              </h3>
              <CodeBlock code="guard schedule --cron \0 2 * * *\ --dbname db_name --username your_name --password my_password" />

              <h3 className="text-lg font-semibold mb-4 mt-6">List Command</h3>
              <CodeBlock code="guard list" />

              <h3 className="text-lg font-semibold mb-4 mt-6">
                Unschedule Command
              </h3>
              <CodeBlock code="guard unschedule --j job_id" />
            </CardContent>
            <CardFooter>
              <Link className="mx-auto" href={"/docs"}>
                <Button variant="link">View Full Documentation</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
