import React, { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (chatId) => {
    // Mock API call
    return [
      { sender: "User1", text: "Hello!" },
      { sender: "User2", text: "Hi there!" },
    ];
  };

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, fetchMessages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
