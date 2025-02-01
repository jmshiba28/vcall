import { useState, useEffect, useContext, useCallback } from "react";
import { ChatContext } from "../ChatContext";
import { getAuthToken } from "../api/authApi";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "https://your-socket-server.com"; // Replace with actual server

const useChat = (chatId) => {
  const { fetchMessages, sendMessage } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socketRef = useState(null);

  // Fetch messages from API with caching
  const loadMessages = useCallback(async () => {
    if (!chatId) return;

    setLoading(true);
    setError(null);

    try {
      // Check local cache first
      const cachedMessages = localStorage.getItem(`chat_${chatId}`);
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }

      const fetchedMessages = await fetchMessages(chatId);
      setMessages(fetchedMessages);

      // Save to cache
      localStorage.setItem(`chat_${chatId}`, JSON.stringify(fetchedMessages));
    } catch (err) {
      setError("Failed to load messages. Please try again.");
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, [chatId, fetchMessages]);

  // WebSocket setup for real-time chat
  useEffect(() => {
    if (!chatId) return;

    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { chatId, token: getAuthToken() },
    });

    socketRef.current.on("message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId]);

  // Send message with real-time update
  const handleSendMessage = async (messageData) => {
    try {
      const newMessage = await sendMessage(chatId, messageData);
      setMessages((prev) => [...prev, newMessage]);

      // Emit message to WebSocket
      socketRef.current.emit("sendMessage", newMessage);
    } catch (err) {
      setError("Failed to send message.");
      console.error("Send message error:", err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return { messages, sendMessage: handleSendMessage, loading, error };
};

export default useChat;
