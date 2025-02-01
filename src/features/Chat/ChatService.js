import { getChats, sendMessage } from "../../api/chatApi";
import { io } from "socket.io-client";

const socket = io("https://your-socket-server.com");

// Fetch chat messages with caching & retries
export const fetchChatMessages = async (chatId) => {
  try {
    // Check cache first
    const cachedMessages = localStorage.getItem(`chat-${chatId}`);
    if (cachedMessages) return JSON.parse(cachedMessages);

    const messages = await getChats(chatId);

    // Save to cache
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(messages));
    
    return messages;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};

// Send a message with optimistic UI & real-time sync
export const sendChatMessage = async (chatId, message) => {
  const tempMessage = {
    id: `temp-${Date.now()}`,
    chatId,
    sender: "currentUser", // Replace with actual user ID
    text: message.text,
    timestamp: new Date().toISOString(),
    status: "sending",
  };

  try {
    // Optimistically update UI
    const chatMessages = JSON.parse(localStorage.getItem(`chat-${chatId}`)) || [];
    localStorage.setItem(`chat-${chatId}`, JSON.stringify([...chatMessages, tempMessage]));

    // Send message to API
    const sentMessage = await sendMessage(chatId, message);

    // Replace temp message with actual one
    const updatedMessages = chatMessages.map((msg) => (msg.id === tempMessage.id ? sentMessage : msg));
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(updatedMessages));

    // Emit event to WebSocket
    socket.emit("newMessage", sentMessage);

    return sentMessage;
  } catch (error) {
    console.error("Error sending message:", error);
    
    // Update message status to "failed"
    const failedMessages = JSON.parse(localStorage.getItem(`chat-${chatId}`)) || [];
    const updatedMessages = failedMessages.map((msg) =>
      msg.id === tempMessage.id ? { ...msg, status: "failed" } : msg
    );
    localStorage.setItem(`chat-${chatId}`, JSON.stringify(updatedMessages));

    throw error;
  }
};
