import { getUserDetails } from "../../api/userApi";

/**
 * Fetches user details with caching, error handling, and logging.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<object|null>} - Returns user data or null on error.
 */
export const fetchUser = async (userId) => {
  if (!userId) {
    console.warn("fetchUser: No userId provided.");
    return null;
  }

  const cacheKey = `user_${userId}`;
  try {
    // Check local storage cache first
    const cachedUser = localStorage.getItem(cacheKey);
    if (cachedUser) {
      console.log(`fetchUser: Returning cached data for user ${userId}`);
      return JSON.parse(cachedUser);
    }

    console.log(`fetchUser: Fetching data for user ${userId} from API...`);
    const userData = await getUserDetails(userId);

    // Cache the response
    localStorage.setItem(cacheKey, JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error(`fetchUser: Error fetching user ${userId}`, error);
    return null;
  }
};

/**
 * Clears cached user data from local storage.
 * @param {string} userId - The ID of the user whose cache should be cleared.
 */
export const clearUserCache = (userId) => {
  if (!userId) return;
  const cacheKey = `user_${userId}`;
  localStorage.removeItem(cacheKey);
  console.log(`clearUserCache: Cleared cache for user ${userId}`);
};
