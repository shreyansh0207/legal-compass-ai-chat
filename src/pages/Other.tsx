
import { Puzzle, Home, HeartPulse, Wifi, Lock } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

const Other = () => {
  const welcomeMessage = `Welcome to the Legal Domains Assistant! 🧩

I can help you with various specialized legal questions, such as:
- Real estate law and property transactions
- Marriage and family law
- Cyber law and digital security
- Intellectual property rights
- Healthcare compliance
- Media and entertainment law

What specialized legal domain can I assist you with today?`;

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <Puzzle className="mr-2 h-6 w-6" />
                Other Legal Domains
              </h2>
              <p className="text-muted-foreground mb-6">
                Specialized legal assistance for various domains including real estate, family law, cyber law, and more.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Common Topics</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Real Estate Law</span>
                  </div>
                  <div className="flex items-center">
                    <HeartPulse className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Marriage & Family Law</span>
                  </div>
                  <div className="flex items-center">
                    <Wifi className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Cyber Law</span>
                  </div>
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Intellectual Property</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Need personalized assistance from a legal expert?
                </p>
                <a href="/lawyers" className="text-primary text-sm font-medium hover:underline">
                  Find Specialized Legal Experts →
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <ChatInterface 
              category="Other Domains" 
              welcomeMessage={welcomeMessage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Other;
