import { Terminal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

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

const CommandCard: React.FC<{ command: CommandDetails }> = ({ command }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Terminal className="mr-2 h-5 w-5 text-primary" />
          <span>{command.name}</span>
        </CardTitle>
        <CardDescription>{command.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2">Usage</h3>
            <pre className="bg-slate-950 text-slate-50 p-3 rounded-md overflow-x-auto text-sm">
              <code>{command.usage}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Options</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Option</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {command.options.map((option) => (
                  <TableRow key={option.name}>
                    <TableCell className="font-mono text-sm">
                      {option.name}
                    </TableCell>
                    <TableCell>{option.description}</TableCell>
                    <TableCell>{option.required ? "Yes" : "No"}</TableCell>
                    <TableCell>{option.defaultValue || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Examples</h3>
            {command.examples.map((example, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">
                  {example.description}
                </p>
                <pre className="bg-slate-950 text-slate-50 p-3 rounded-md overflow-x-auto text-sm">
                  <code>{example.command}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandCard;
