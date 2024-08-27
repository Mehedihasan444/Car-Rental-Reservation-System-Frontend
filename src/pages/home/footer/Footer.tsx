import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-6 w-6 hover:text-gray-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-6 w-6 hover:text-gray-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-6 w-6 hover:text-gray-400" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6 hover:text-gray-400" />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gray-400">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} RentoCar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
