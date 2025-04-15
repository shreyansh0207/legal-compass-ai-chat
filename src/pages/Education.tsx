
import { BookOpen, School, GraduationCap, Library, BookMarked } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

const Education = () => {
  const welcomeMessage = `Welcome to the Education Law Assistant! 👋

I can help you with various education-related legal questions, such as:
- Government regulations for opening schools
- Compliance requirements for educational institutions
- Teacher certification and licensing
- Student rights and responsibilities
- Special education laws
- Educational institution accreditation

How can I assist you with education law today?`;

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <BookOpen className="mr-2 h-6 w-6" />
                Education Law
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore legal guidance for educational institutions, schools, universities, and policies.
              </p>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Common Topics</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <School className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">School Establishment</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Educational Compliance</span>
                  </div>
                  <div className="flex items-center">
                    <Library className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Institution Licensing</span>
                  </div>
                  <div className="flex items-center">
                    <BookMarked className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Education Policies</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Need personalized assistance from a legal expert?
                </p>
                <a href="/lawyers" className="text-primary text-sm font-medium hover:underline">
                  Find Education Law Specialists →
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <ChatInterface 
              category="Education" 
              welcomeMessage={welcomeMessage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
