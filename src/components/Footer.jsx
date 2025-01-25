import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        </div>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
