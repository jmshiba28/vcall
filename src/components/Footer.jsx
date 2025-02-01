import React from "react";
import { Link } from "react-router-dom";

// Define social media links dynamically
const socialLinks = [
  { href: "https://facebook.com", icon: "fab fa-facebook-f", label: "Facebook" },
  { href: "https://twitter.com", icon: "fab fa-twitter", label: "Twitter" },
  { href: "https://linkedin.com", icon: "fab fa-linkedin-in", label: "LinkedIn" },
  { href: "https://instagram.com", icon: "fab fa-instagram", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-gray-700 dark:bg-gray-950 dark:border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} My Website. All rights reserved.
          </p>
        </div>

        {/* Center Links */}
        <nav className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
          <Link to="/terms" className="hover:text-gray-300 text-sm transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-gray-300 text-sm transition-colors">
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-gray-300 text-sm transition-colors">
            Contact
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white text-lg hover:text-gray-300 transition-colors"
            >
              <i className={icon}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
