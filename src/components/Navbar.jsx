import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate checking authentication (e.g., from localStorage or a global state)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data on logout
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          <Link to="/">My Website</Link>
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
