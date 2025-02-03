import React, { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { createRoom, joinRoom, getRoomDetails } from "../api/videoApi";

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch room details & participants
  const fetchRoomInfo = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const roomDetails = await getRoomDetails(id);
      setParticipants(roomDetails?.participants || []);
      setRoomId(id);
    } catch (err) {
      setError("Failed to fetch room details.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new video room
  const handleCreateRoom = async (roomData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newRoom = await createRoom(roomData);
      setRoomId(newRoom.id);
      setParticipants(newRoom.participants || []);
    } catch (err) {
      setError("Room creation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Join an existing video room
  const handleJoinRoom = async (id, userData) => {
    setIsLoading(true);
    setError(null);
    try {
      await joinRoom(id, userData);
      await fetchRoomInfo(id);
    } catch (err) {
      setError("Failed to join the room.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle participant updates (real-time simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      if (roomId) {
        fetchRoomInfo(roomId);
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [roomId, fetchRoomInfo]);

  return (
    <VideoContext.Provider
      value={{
        roomId,
        participants,
        isLoading,
        error,
        createRoom: handleCreateRoom,
        joinRoom: handleJoinRoom,
        refreshRoom: fetchRoomInfo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

VideoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VideoProvider;
