
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  path: string;
  color: string;
}

const CategoryCard = ({ title, description, icon, path, color }: CategoryCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg border border-border">
      <CardHeader className={`${color} text-white rounded-t-lg`}>
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            {icon}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <CardDescription className="text-foreground/80 text-sm">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link to={path}>
            Ask Questions <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
