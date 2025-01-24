import React, { useState, useEffect } from 'react';
import ChatLayout from '../components/ChatLayout';
import { fetchMessages, sendMessage, deleteMessage } from '../api/chatApi';
import MessageList from '../features/Chat/components/MessageList';
import Input from '../components/Input/input';
import Button from '../components/Button/button';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const initialMessages = await fetchMessages('roomId123'); // Replace with actual room ID
        setMessages(initialMessages);
      } catch (err) {
        setError('Failed to load messages.');
      }
    };

    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim()) {
      try {
        const newMessage = await sendMessage('roomId123', input); // Replace with actual room ID
        setMessages([...messages, newMessage]);
        setInput('');
        setIsTyping(false);
      } catch (err) {
        setError('Failed to send message.');
      }
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage('roomId123', messageId); // Replace with actual room ID
      setMessages(messages.filter(message => message.id !== messageId));
    } catch (err) {
      setError('Failed to delete message.');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(true);
  };

  return (
    <ChatLayout>
      <div className="chat-container">
        <h2>Chat Room</h2>
        {error && <p className="error">{error}</p>}
        <MessageList messages={messages} onDeleteMessage={handleDeleteMessage} />
        {isTyping && <p className="typing-indicator">Someone is typing...</p>}
        <div className="input-container">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <Button onClick={handleSendMessage} label="Send" />
        </div>
      </div>
    </ChatLayout>
  );
};

export default ChatPage;