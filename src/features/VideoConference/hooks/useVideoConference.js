import { useEffect, useState, useCallback } from "react";
import { fetchRoomDetails } from "../../api/videoApi";

const useVideoConference = (roomId) => {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load room details
  const loadParticipants = useCallback(async () => {
    if (!roomId) return;

    setIsLoading(true);
    setError(null);

    try {
      const roomDetails = await fetchRoomDetails(roomId);
      setParticipants(roomDetails.participants || []);
    } catch (err) {
      console.error("Error fetching room details:", err);
      setError("Failed to load participants. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    loadParticipants();

    // Simulating real-time updates (Polling every 10 seconds)
    const interval = setInterval(loadParticipants, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [loadParticipants]);

  return { participants, isLoading, error, reload: loadParticipants };
};

export default useVideoConference;
