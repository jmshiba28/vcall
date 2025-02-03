import { getRoomDetails } from "../../api/videoApi";

// Cache to avoid redundant API calls
const roomCache = new Map();

export const fetchRoomParticipants = async (roomId) => {
  if (!roomId) {
    throw new Error("Room ID is required.");
  }

  // Check cache first
  if (roomCache.has(roomId)) {
    return roomCache.get(roomId);
  }

  try {
    const roomDetails = await getRoomDetails(roomId);
    const participants = roomDetails?.participants || [];

    // Store result in cache
    roomCache.set(roomId, participants);

    return participants;
  } catch (error) {
    console.error("Failed to fetch room participants:", error);
    throw new Error("Could not retrieve room participants.");
  }
};

// Function to refresh participants data periodically
export const refreshRoomParticipants = async (roomId, callback) => {
  if (!roomId || typeof callback !== "function") {
    throw new Error("Valid Room ID and callback function are required.");
  }

  try {
    const participants = await fetchRoomParticipants(roomId);
    callback(participants); // Update UI with new data
  } catch (error) {
    console.error("Error refreshing room participants:", error);
  }
};

// Auto-refresh every 5 seconds
export const autoRefreshParticipants = (roomId, callback, interval = 5000) => {
  const intervalId = setInterval(() => {
    refreshRoomParticipants(roomId, callback);
  }, interval);

  return () => clearInterval(intervalId); // Cleanup function
};
