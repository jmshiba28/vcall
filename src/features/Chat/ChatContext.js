import React, { createContext, useState, useEffect, useCallback } from "react";
import { fetchMessages as fetchChatMessages, sendMessage as sendChatMessage } from "../api/chatApi";
import { getAuthToken } from "../api/authApi";
import { io } from "socket.io-client";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;

    // Initialize WebSocket connection
    const newSocket = io("https://your-socket-server.com", {
      auth: { token },
    });

    newSocket.on("message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    newSocket.on("typing", (status) => {
      setIsTyping(status);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchMessages = useCallback(async (chatId) => {
    try {
      const cachedMessages = localStorage.getItem(`chat-${chatId}`);
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }

      const fetchedMessages = await fetchChatMessages(chatId);
      setMessages(fetchedMessages);
      localStorage.setItem(`chat-${chatId}`, JSON.stringify(fetchedMessages));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  const sendMessage = async (chatId, messageData) => {
    try {
      const sentMessage = await sendChatMessage(chatId, messageData);
      setMessages((prev) => [...prev, sentMessage]);

      if (socket) {
        socket.emit("message", sentMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const startTyping = (chatId) => {
    if (socket) {
      socket.emit("typing", { chatId, isTyping: true });
    }
  };

  const stopTyping = (chatId) => {
    if (socket) {
      socket.emit("typing", { chatId, isTyping: false });
    }
  };

  return (
    <ChatContext.Provider value={{ messages, fetchMessages, sendMessage, isTyping, startTyping, stopTyping }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
