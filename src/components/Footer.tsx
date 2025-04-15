
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Logo invert={true} />
            </div>
            <p className="text-sm opacity-80 mb-4">
              Providing reliable legal assistance and connecting you with qualified lawyers for all your legal needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/lawyers" className="text-sm hover:underline">Find Lawyers</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:underline">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/education" className="text-sm hover:underline">Education Law</Link>
              </li>
              <li>
                <Link to="/sports" className="text-sm hover:underline">Sports Law</Link>
              </li>
              <li>
                <Link to="/finance" className="text-sm hover:underline">Finance Law</Link>
              </li>
              <li>
                <Link to="/other" className="text-sm hover:underline">Other Domains</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">support@legalcompass.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span className="text-sm">123 Legal Street, Suite 100<br />Lawville, LA 90210</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Legal Compass. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="text-sm hover:underline">Terms of Service</Link>
              <Link to="/cookies" className="text-sm hover:underline">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
