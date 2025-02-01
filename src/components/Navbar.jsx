// import React, { useState, useEffect, useContext } from 'react';

import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">
          <Link to="/">My Website</Link>
        </h1>

        {/* Mobile Menu Icon */}
        <button className="menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          </li>

          {isAuthenticated ? (
            <li className="relative">
              <button onClick={toggleDropdown} className="dropdown-toggle">Profile ▼</button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
              </li>
              <li>
                <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;









// AuthContext.js (Context for Authentication)


// import { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     setIsAuthenticated(!!user);
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
