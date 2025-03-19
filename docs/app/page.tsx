import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Terminal,
  Database,
  Cloud,
  Clock,
  ArrowDownToLine,
} from "lucide-react";
import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import Layout from "@/components/Layout";
import InstallationAndCommands from "@/components/Installation-and-Usage";

const HomePage = () => {
  return (
    <Layout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
       
        {/* Hero Section */}
        <section className="py-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Database size={48} className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Database Guardian</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A powerful command-line utility for backing up and restoring
            multiple database types
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={"/docs"}>
              <Button size="lg">
                Get Started <ChevronRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link href={"https://github.com/Annany2002/Database-Guardian"}>
              <Button size="lg" variant="outline">
                View on GitHub
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Multiple Database Support"
              description="Works with PostgreSQL, with MySQL, MongoDB, and SQLite coming soon."
              icon={<Database size={24} />}
              status="upcoming"
            />
            <FeatureCard
              title="Backup Operations"
              description="Perform full backups with compression to save storage space."
              icon={<ArrowDownToLine size={24} />}
            />
            <FeatureCard
              title="Cloud Storage"
              description="Store backups to AWS S3, with Google Cloud and Azure support coming soon."
              icon={<Cloud size={24} />}
              status="upcoming"
            />
            <FeatureCard
              title="Restore Operations"
              description="Easily restore databases from backup files with a simple command."
              icon={<ArrowDownToLine size={24} />}
            />
            <FeatureCard
              title="Scheduled Backups"
              description="Set up automatic backups using cron jobs to ensure your data is always safe."
              icon={<Clock size={24} />}
            />
            <FeatureCard
              title="Docker Support"
              description="Run Database Guardian via Docker without needing to install Go locally."
              icon={<Terminal size={24} />}
            />
          </div>
        </section>

        {/* Installation & Commands Section */}
        <InstallationAndCommands />

        {/* CTA Section */}
        <section className="py-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to secure your database?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Start using Database Guardian today to ensure your data is
                  always safe, secure, and recoverable.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/docs">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link href="https://github.com/Annany2002/Database-Guardian">
                    <Button size="lg" variant="outline">
                      View on GitHub
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Database size={20} className="text-primary" />
              <span className="font-semibold">Database Guardian</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Licensed under MIT. Contact:{" "}
              <a
                href="mailto:shazam6061@gmail.com"
                className="text-primary hover:underline"
              >
                shazam6061@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default HomePage;
