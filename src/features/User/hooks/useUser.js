import { useState, useEffect } from "react";
import { getUserDetails } from "../../api/userApi";

const useUser = (userId) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userDetails = await getUserDetails(userId);
        setUser(userDetails);
      }
    };

    fetchUser();
  }, [userId]);

  return { user };
};

export default useUser;
