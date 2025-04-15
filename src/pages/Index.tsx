
import { Book, Award, CreditCard, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryCard from "@/components/CategoryCard";
import LawyerDirectory from "@/components/LawyerDirectory";
import { Button } from "@/components/ui/button";

const Index = () => {
  const categories = [
    {
      title: "📘 Education",
      description: "Legal advice for schools, colleges, educational institutions, and policies.",
      icon: <Book className="h-5 w-5 text-white" />,
      path: "/education",
      color: "bg-blue-600"
    },
    {
      title: "🏅 Sports",
      description: "Legal guidance for sports organizations, athletes, and sports-related businesses.",
      icon: <Award className="h-5 w-5 text-white" />,
      path: "/sports",
      color: "bg-green-600"
    },
    {
      title: "💰 Finance",
      description: "Legal advice for financial institutions, credit firms, and financial compliance.",
      icon: <CreditCard className="h-5 w-5 text-white" />,
      path: "/finance",
      color: "bg-amber-600"
    },
    {
      title: "🧩 Other Domains",
      description: "Legal assistance for real estate, marriage, cyber law, and other specialized areas.",
      icon: <Puzzle className="h-5 w-5 text-white" />,
      path: "/other",
      color: "bg-purple-600"
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6">
                Navigate Legal Challenges with Confidence
              </h1>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Get expert legal assistance across education, sports, finance, and more. Connect with qualified lawyers for personalized guidance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/education">Ask Legal Questions</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10" asChild>
                  <Link to="/lawyers">Find a Lawyer</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Legal Compass" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Legal Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your area of interest to get specialized legal guidance from our AI assistant.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultants Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Consult a Lawyer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with verified legal experts for personalized consultations and professional advice.
            </p>
          </div>
          
          <LawyerDirectory />
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/lawyers">View All Lawyers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Legal Compass</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive legal assistance tailored to your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Assistance</h3>
              <p className="text-muted-foreground">
                Get instant legal guidance on various domains with our advanced AI assistant.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Lawyers</h3>
              <p className="text-muted-foreground">
                Connect with thoroughly vetted legal professionals with expertise in various domains.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Consultations</h3>
              <p className="text-muted-foreground">
                Book paid consultations with lawyers through our secure payment gateway.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
