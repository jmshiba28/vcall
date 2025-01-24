import React from 'react';
import { ChatLayout } from '../layouts/ChatLayout';
import { useChat } from '../hooks/useChat';

const ChatPage = () => {
  const roomId = "room1"; // Example room ID
  const messages = useChat(roomId);

  return (
    <ChatLayout>
      <h2>Chat Room</h2>
      <div className="chat-messages">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="message">
              <strong>{message.user}</strong>: {message.text}
            </div>
          ))
        )}
      </div>
    </ChatLayout>
  );
};

export default ChatPage;
