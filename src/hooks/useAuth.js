import { useState, useEffect } from "react";
import { getUserDetails, loginUser, logoutUser } from "../api/userApi";
import { getAuthToken, setAuthToken, removeAuthToken } from "../utils/authStorage";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);
      } catch (err) {
        console.error("Error fetching user details:", err);
        removeAuthToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const { user, token } = await loginUser(credentials);
      setUser(user);
      setAuthToken(token);
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid credentials, please try again.");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      removeAuthToken();
      setUser(null);
    } catch (err) {
      console.error("Error logging out:", err);
      throw err;
    }
  };

  return { user, loading, error, login, logout };
};

export default useAuth;








// authStorage.js (Token Management)

// export const getAuthToken = () => localStorage.getItem("authToken");

// export const setAuthToken = (token) => {
//   localStorage.setItem("authToken", token);
// };

// export const removeAuthToken = () => {
//   localStorage.removeItem("authToken");
// };
