import React, { createContext, useState } from "react";

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [roomId, setRoomId] = useState(null);

  const joinRoom = (id) => {
    setRoomId(id);
  };

  return (
    <VideoContext.Provider value={{ roomId, joinRoom }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
