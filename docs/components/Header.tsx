import Link from "next/link";
import {
  Database,
  GithubIcon,
  Menu,
  Book,
  Terminal,
  ArrowDownToLine,
  Github,
} from "lucide-react";
import { Sheet } from "./ui/sheet";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, SheetTitle } from "./ui/sheet";

export default function Header() {
  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Guard</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/docs"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/examples"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Examples
            </Link>
            <Link
              href="/commands"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Commands
            </Link>
            <Link
              href="https://github.com/Annany2002/Database-Guardian"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Button>Get Started</Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle></SheetTitle>
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/docs"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                >
                  <Book className="h-5 w-5" />
                  <span>Documentation</span>
                </Link>
                <Link
                  href="/examples"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                >
                  <Terminal className="h-5 w-5" />
                  <span>Examples</span>
                </Link>
                <Link
                  href="commands"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                >
                  <ArrowDownToLine className="h-5 w-5" />
                  <span>Commands</span>
                </Link>
                <Link
                  href="https://github.com/Annany2002/Database-Guardian"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </Link>
                <Button className="mt-4">Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
