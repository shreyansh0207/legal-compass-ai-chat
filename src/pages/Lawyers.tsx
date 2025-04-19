
import LawyerDirectory from "@/components/LawyerDirectory";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CreditCard, FileText } from "lucide-react";

const Lawyers = () => {
  return (
    <div className="bg-background">
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Find Qualified Legal Experts</h1>
          <p className="text-lg max-w-3xl">
            Connect with experienced lawyers specializing in various legal domains. 
            Book consultations, get professional advice, and resolve your legal challenges.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
              <MessageCircle className="mr-1 h-3 w-3" />
              5 Free Messages
            </Badge>
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
              <CreditCard className="mr-1 h-3 w-3" />
              Affordable Consultations
            </Badge>
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
              <FileText className="mr-1 h-3 w-3" />
              PDF Agreements
            </Badge>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LawyerDirectory />
        </div>
      </section>
      
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting legal assistance has never been easier. Follow these simple steps:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center items-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Browse Lawyers</h3>
              <p className="text-sm text-muted-foreground text-center">
                Search through our directory of verified legal experts specializing in various domains.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center items-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Send Free Messages</h3>
              <p className="text-sm text-muted-foreground text-center">
                Start with 5 free messages to each lawyer. Get initial advice before committing to a paid consultation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center items-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Book Consultation</h3>
              <p className="text-sm text-muted-foreground text-center">
                Pay a one-time fee to unlock unlimited messaging, phone contact, and receive a PDF agreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Messaging and Consultation Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers flexible options to meet your legal needs, from free initial messages to comprehensive paid consultations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border rounded-lg p-6 bg-secondary/30">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Free Messages</h3>
                  <p className="text-sm text-muted-foreground">Get started with no cost</p>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>5 free messages with each lawyer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Basic legal questions answered</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Initial assessment of legal needs</span>
                </li>
                <li className="flex items-start text-muted-foreground">
                  <span className="mr-2 mt-1">✗</span>
                  <span>No direct phone contact</span>
                </li>
                <li className="flex items-start text-muted-foreground">
                  <span className="mr-2 mt-1">✗</span>
                  <span>No document review</span>
                </li>
              </ul>
              
              <div className="text-center p-2 bg-secondary rounded-md">
                <span className="font-medium">Price: Free</span>
              </div>
            </div>
            
            <div className="border-2 border-primary rounded-lg p-6 relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
                RECOMMENDED
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Paid Consultation</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive legal assistance</p>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Unlimited messages with the lawyer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Direct phone contact information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Document review and feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>PDF consultation agreement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Scheduling priority</span>
                </li>
              </ul>
              
              <div className="text-center p-2 bg-primary/10 rounded-md">
                <span className="font-medium">Price: $99.00 one-time payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lawyers;
