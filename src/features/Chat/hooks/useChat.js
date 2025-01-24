import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../ChatContext";

const useChat = (chatId) => {
  const { fetchMessages, sendMessage } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      const loadMessages = async () => {
        const fetchedMessages = await fetchMessages(chatId);
        setMessages(fetchedMessages);
      };
      loadMessages();
    }
  }, [chatId, fetchMessages]);

  return { messages, sendMessage };
};

export default useChat;
