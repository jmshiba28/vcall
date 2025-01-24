// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/chat"; // Update the base URL as per your backend

// export const getChats = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// export const sendMessage = async (chatId, message) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/send`, { chatId, message });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// export const createChat = async (participants) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/create`, { participants });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };






// /src/api/chatApi.js
import axios from 'axios';

const API_URL = 'https://your-api-endpoint.com/chat';

// Create a chat
export const createChat = async (chatData) => {
  const response = await axios.post(`${API_URL}/create`, chatData);
  return response.data;
};

// Get all chats
export const getChats = async () => {
  const response = await axios.get(`${API_URL}/get`);
  return response.data;
};

// Send a message
export const sendMessage = async (messageData) => {
  const response = await axios.post(`${API_URL}/send`, messageData);
  return response.data;
};

// Fetch messages for a specific chat
export const fetchMessages = async (chatId) => {
  const response = await axios.get(`${API_URL}/messages/${chatId}`);
  return response.data;
};
