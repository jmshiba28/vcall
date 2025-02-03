import { useState, useEffect, useCallback } from "react";
import { fetchMessages, sendMessage as sendChatMessage, subscribeToNewMessages } from "../api/chatApi";

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const messages = await fetchMessages(roomId);
        setMessages(messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Real-time message subscription
    const unsubscribe = subscribeToNewMessages(roomId, (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [roomId]);

  const sendMessage = useCallback(async (message) => {
    try {
      // Optimistic UI update
      setMessages((prevMessages) => [...prevMessages, { ...message, pending: true }]);

      const savedMessage = await sendChatMessage(roomId, message);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.pending ? { ...savedMessage, pending: false } : msg
        )
      );
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message.");
    }
  }, [roomId]);

  return { messages, sendMessage, loading, error };
};








// chatApi.js (with WebSockets for real-time chat)

// import axios from "axios";

// const API_URL = "https://your-api-endpoint.com/chat";
// const socket = new WebSocket("wss://your-api-endpoint.com");

// export const fetchMessages = async (roomId) => {
//   const response = await axios.get(`${API_URL}/messages/${roomId}`);
//   return response.data;
// };

// export const sendMessage = async (roomId, message) => {
//   const response = await axios.post(`${API_URL}/send/${roomId}`, message);
//   return response.data;
// };

// export const subscribeToNewMessages = (roomId, callback) => {
//   socket.onmessage = (event) => {
//     const newMessage = JSON.parse(event.data);
//     if (newMessage.roomId === roomId) {
//       callback(newMessage);
//     }
//   };

//   return () => socket.close(); // Cleanup function
// };
