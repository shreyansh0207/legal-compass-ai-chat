
import { CreditCard, DollarSign, Building, BarChart, PieChart } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

const Finance = () => {
  const welcomeMessage = `Welcome to the Finance Law Assistant! 💰

I can help you with various finance-related legal questions, such as:
- Licenses required to run a credit firm
- Banking regulations and compliance
- Securities law and investment guidance
- Tax regulations for financial institutions
- Insurance company compliance
- Fintech startup legal requirements

How can I assist you with finance law today?`;

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <CreditCard className="mr-2 h-6 w-6" />
                Finance Law
              </h2>
              <p className="text-muted-foreground mb-6">
                Legal guidance for financial institutions, credit firms, and financial compliance.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Common Topics</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Credit Firm Licensing</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Banking Regulations</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Securities & Investments</span>
                  </div>
                  <div className="flex items-center">
                    <PieChart className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Financial Compliance</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Need personalized assistance from a legal expert?
                </p>
                <a href="/lawyers" className="text-primary text-sm font-medium hover:underline">
                  Find Finance Law Specialists →
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <ChatInterface 
              category="Finance" 
              welcomeMessage={welcomeMessage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
