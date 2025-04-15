
import { Award, Trophy, Dumbbell, Flag, Users } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

const Sports = () => {
  const welcomeMessage = `Welcome to the Sports Law Assistant! 🏅

I can help you with various sports-related legal questions, such as:
- Compliance requirements for starting a sports academy
- Athlete contracts and representation
- Sports organization governance
- Licensing and broadcasting rights
- Doping regulations and athlete eligibility
- Sports event organization legal requirements

How can I assist you with sports law today?`;

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <Award className="mr-2 h-6 w-6" />
                Sports Law
              </h2>
              <p className="text-muted-foreground mb-6">
                Legal guidance for sports organizations, athletes, teams, and sports-related businesses.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Common Topics</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Sports Academy Establishment</span>
                  </div>
                  <div className="flex items-center">
                    <Dumbbell className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Athlete Contracts</span>
                  </div>
                  <div className="flex items-center">
                    <Flag className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Event Regulations</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Team Management</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Need personalized assistance from a legal expert?
                </p>
                <a href="/lawyers" className="text-primary text-sm font-medium hover:underline">
                  Find Sports Law Specialists →
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <ChatInterface 
              category="Sports" 
              welcomeMessage={welcomeMessage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sports;
