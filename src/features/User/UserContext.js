import React, { createContext, useState, useEffect, useCallback } from "react";

// Create UserContext
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // User state management
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial load
  const loadUserFromLocalStorage = useCallback(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Update localStorage whenever the user state changes
  const updateUserInLocalStorage = useCallback((userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  // Initialize the user state from localStorage
  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  // Set user and update localStorage
  const setUserAndUpdateLocalStorage = useCallback((userData) => {
    setUser(userData);
    updateUserInLocalStorage(userData);
  }, [updateUserInLocalStorage]);

  // Log out user and clear localStorage
  const logout = () => {
    setUser(null);
    updateUserInLocalStorage(null);
  };

  // Mock fetch user function (simulate API call)
  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      const fetchedUser = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            name: "John Doe",
            email: "john.doe@example.com",
            id: 1,
          });
        }, 1000);
      });
      setUserAndUpdateLocalStorage(fetchedUser);
    } catch (err) {
      setError("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  }, [setUserAndUpdateLocalStorage]);

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndUpdateLocalStorage, isLoading, error, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
