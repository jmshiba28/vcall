import { useEffect, useState } from "react";
import { fetchRoomDetails } from "../../api/videoApi";

const useVideoConference = (roomId) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (roomId) {
      const loadParticipants = async () => {
        const roomDetails = await fetchRoomDetails(roomId);
        setParticipants(roomDetails.participants || []);
      };
      loadParticipants();
    }
  }, [roomId]);

  return { participants };
};

export default useVideoConference;
