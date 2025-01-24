import { getChats, sendMessage } from "../../api/chatApi";

export const fetchChatMessages = async (chatId) => {
  return await getChats(chatId);
};

export const sendChatMessage = async (chatId, message) => {
  return await sendMessage(chatId, message);
};
