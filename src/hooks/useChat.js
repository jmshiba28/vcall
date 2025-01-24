import { useState, useEffect } from 'react';
import { fetchMessages } from '../api/chatApi';

export const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const messages = await fetchMessages(roomId);
      setMessages(messages);
    };

    loadMessages();
  }, [roomId]);

  return messages;
};
