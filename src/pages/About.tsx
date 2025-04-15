
import { Shield, Award, Users, BookOpen, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="bg-background">
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl font-bold mb-4">About Legal Compass</h1>
              <p className="text-lg">
                We're on a mission to make legal assistance accessible, understandable, and affordable for everyone.
                Through our AI-powered platform and network of verified lawyers, we bridge the gap between complex legal
                matters and individuals seeking guidance.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 p-8 rounded-full">
                <Shield className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Legal Compass was founded in 2023 by a team of legal professionals and technology experts who recognized
              the challenges people face when navigating complex legal systems. Our platform combines advanced AI
              technology with human expertise to provide reliable legal guidance across various domains.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We're committed to providing the highest quality legal information and connecting users with top-tier legal professionals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe everyone deserves access to quality legal guidance, regardless of background or resources.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p className="text-muted-foreground">
                We empower users with knowledge and understanding of their legal rights and responsibilities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">How We Verify Lawyers</h2>
              <p className="text-muted-foreground mb-6">
                We maintain a rigorous verification process to ensure all lawyers on our platform are qualified,
                experienced, and ready to provide expert assistance.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-foreground">
                    <span className="font-medium">Credential Verification:</span> We verify all professional qualifications and bar admissions.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-foreground">
                    <span className="font-medium">Experience Assessment:</span> We ensure all lawyers have demonstrated expertise in their practice areas.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-foreground">
                    <span className="font-medium">Client Reviews:</span> We collect and display genuine client feedback and ratings.
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-foreground">
                    <span className="font-medium">Ongoing Monitoring:</span> We continuously monitor performance and client satisfaction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="order-first md:order-last">
              <img 
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Lawyer verification" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Join Us in Making Legal Help Accessible</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Whether you're seeking legal guidance or you're a lawyer looking to expand your practice,
            Legal Compass provides the platform to connect and collaborate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/lawyers" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90">
              Find a Lawyer
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-white hover:bg-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
