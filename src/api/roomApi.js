// roomapi.js
import axios from 'axios';
import { getAuthToken } from './authApi';

const API_URL = 'https://your-api-endpoint.com/api/rooms';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  },
});

export const getRoomDetails = async (roomId) => {
  const response = await apiClient.get(`/${roomId}`);
  return response.data;
};

export const joinRoom = async (roomId) => {
  const response = await apiClient.post(`/join/${roomId}`);
  return response.data;
};

export const leaveRoom = async (roomId) => {
  const response = await apiClient.post(`/leave/${roomId}`);
  return response.data;
};

export const sendMessage = async (roomId, message) => {
  const response = await apiClient.post(`/message/${roomId}`, { message });
  return response.data;
};
