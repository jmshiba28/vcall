import { getRoomDetails } from "../../api/videoApi";

export const fetchRoomParticipants = async (roomId) => {
  const roomDetails = await getRoomDetails(roomId);
  return roomDetails.participants;
};
