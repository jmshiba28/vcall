// videoapi.js
import axios from 'axios';
import { getAuthToken } from './authApi';

const API_URL = 'https://your-api-endpoint.com/video';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  },
});

export const createRoom = async (roomData) => {
  const response = await apiClient.post('/create', roomData);
  return response.data;
};

export const getRoomDetails = async (roomId) => {
  const response = await apiClient.get(`/details/${roomId}`);
  return response.data;
};

export const joinRoom = async (roomId, userData) => {
  const response = await apiClient.post(`/join/${roomId}`, userData);
  return response.data;
};

export const startVideoConference = async (roomId) => {
  const response = await apiClient.post(`/start/${roomId}`);
  return response.data;
};
