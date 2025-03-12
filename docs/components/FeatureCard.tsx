import { Badge } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: "upcoming" | "current";
}> = ({ title, description, icon, status }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {status === "upcoming" && (
            <Badge className="text-yellow-500 border-yellow-500">
              Upcoming
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
