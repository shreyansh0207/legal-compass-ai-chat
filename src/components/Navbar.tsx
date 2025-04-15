
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Book, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo size="lg" />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/lawyers" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Find Lawyers
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Link>
            <Button variant="default" size="sm">
              <HelpCircle className="mr-2 h-4 w-4" />
              Get Help
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/lawyers" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Find Lawyers
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Button variant="default" className="w-full mt-2" onClick={() => setIsOpen(false)}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Get Help
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
