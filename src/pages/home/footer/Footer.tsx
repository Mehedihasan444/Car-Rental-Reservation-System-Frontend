import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/carLogo.png";
export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Subscribed with email:", email);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          {/* Social Media Links */}
          <div className="flex-1 flex flex-col items-center gap-5">
            <div className="relative ">
              <Link to="/">
                <img src={logo} alt="logo" className="w-20 h-20" />
              </Link>
              <span className="font-serif absolute top-14 -left- text-sm font-bold  uppercase">
                RentoCar
              </span>
            </div>
            <p className="text-center">
              At RentoCar, we’ve been committed to providing top-quality rental
              services since 2020.{" "}
            </p>
            <div className="flex space-x-6 mb-6 md:mb-0 justify-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-gray-400"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-gray-400"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gray-400"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-gray-400"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col items-center space-y-5">
            <h3 className="font-semibold text-lg">Navigation Links</h3>
            <div className=" space-y-4 text-sm text-left flex flex-col w-full items-center">
              <Link to="/cars" className="hover:text-gray-400">
                Cars
              </Link>
              <Link to="/booking" className="hover:text-gray-400">
                Booking
              </Link>
              <Link to="/about" className="hover:text-gray-400">
                About Us
              </Link>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex-1 space-y-5 flex flex-col items-end ">
            <h3 className="font-semibold text-lg">
              Get New letter by subscribing
            </h3>
            <form
              onSubmit={handleSubscribe}
              className="mb-6 md:mb-0 space-y-3 sm:space-y-0 "
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subscribe to our newsletter"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-r-md text-white hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mt-6 text-center">
        <div className=" space-x-4 text-center my-2 ">
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
          <p className="text-sm text-gray-400 mb-4">
            &copy; {new Date().getFullYear()} RentoCar. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className=" bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full flex items-center mx-auto"
          >
            <ArrowUp className="h-5 w-5 mr-2" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
