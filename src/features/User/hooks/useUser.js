import { useState, useEffect, useCallback } from "react";
import { getUserDetails } from "../../api/userApi";

const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user details with caching and error handling
  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Check if the user data is already in local storage
    const cachedUser = localStorage.getItem(`user-${userId}`);
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setIsLoading(false);
      return;
    }

    try {
      const userDetails = await getUserDetails(userId);
      setUser(userDetails);
      // Store the user data in local storage for future reference
      localStorage.setItem(`user-${userId}`, JSON.stringify(userDetails));
    } catch (err) {
      setError("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  // Manually trigger the re-fetching of user data
  const refetchUser = () => {
    fetchUser();
  };

  return { user, isLoading, error, refetchUser };
};

export default useUser;
