
import LawyerDirectory from "@/components/LawyerDirectory";

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
              <h3 className="text-lg font-semibold text-center mb-2">Book Consultation</h3>
              <p className="text-sm text-muted-foreground text-center">
                Pay a one-time fee to unlock contact information and schedule a consultation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-center items-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">Get Expert Advice</h3>
              <p className="text-sm text-muted-foreground text-center">
                Receive personalized legal guidance tailored to your specific situation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lawyers;
