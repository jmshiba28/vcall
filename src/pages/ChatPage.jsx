import React, { useState, useEffect, useCallback } from "react";
import ChatLayout from "../components/ChatLayout";
import { fetchMessages, sendMessage, deleteMessage } from "../api/chatApi";
import { useWebSocket } from "../hooks/useWebSocket"; // WebSocket Hook for real-time updates
import MessageList from "../features/Chat/components/MessageList";
import Input from "../components/Input/input";
import Button from "../components/Button/button";
import styles from "../styles/ChatPage.module.css";

const ChatPage = () => {
  const roomId = "roomId123"; // Replace with actual dynamic room ID
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // WebSocket for real-time messaging
  const { messages: liveMessages, sendMessage: sendLiveMessage } = useWebSocket(roomId);

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const initialMessages = await fetchMessages(roomId);
        setMessages(initialMessages);
      } catch (err) {
        setError("Failed to load messages.");
      }
    };

    loadMessages();
  }, [roomId]);

  // Sync with WebSocket updates
  useEffect(() => {
    if (liveMessages.length) {
      setMessages(liveMessages);
    }
  }, [liveMessages]);

  // Handle message sending
  const handleSendMessage = async () => {
    if (input.trim()) {
      try {
        const newMessage = await sendMessage(roomId, input);
        sendLiveMessage(newMessage); // Send to WebSocket for real-time update
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setIsTyping(false);
      } catch (err) {
        setError("Failed to send message.");
      }
    }
  };

  // Handle message deletion
  const handleDeleteMessage = useCallback(
    async (messageId) => {
      try {
        await deleteMessage(roomId, messageId);
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      } catch (err) {
        setError("Failed to delete message.");
      }
    },
    [roomId]
  );

  // Handle user typing event
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000); // Reset typing indicator
  };

  return (
    <ChatLayout>
      <div className={styles.chatContainer}>
        <h2 className={styles.chatHeader}>Chat Room</h2>

        {error && <p className={styles.error}>{error}</p>}

        <MessageList messages={messages} onDeleteMessage={handleDeleteMessage} />

        {isTyping && <p className={styles.typingIndicator}>Someone is typing...</p>}

        <div className={styles.inputContainer}>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            aria-label="Chat input"
          />
          <Button onClick={handleSendMessage} label="Send" />
        </div>
      </div>
    </ChatLayout>
  );
};

export default ChatPage;
