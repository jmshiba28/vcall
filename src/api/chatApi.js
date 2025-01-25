// chatapi.js
import axios from 'axios';
import { getAuthToken } from './authApi';

const API_URL = 'https://your-api-endpoint.com/chat';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  },
});

export const createChat = async (chatData) => {
  const response = await apiClient.post('/create', chatData);
  return response.data;
};

export const getChats = async () => {
  const response = await apiClient.get('/get');
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await apiClient.post('/send', messageData);
  return response.data;
};

export const fetchMessages = async (chatId) => {
  const response = await apiClient.get(`/messages/${chatId}`);
  return response.data;
};
