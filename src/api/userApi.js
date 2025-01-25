// userapi.js
import axios from 'axios';
import { getAuthToken } from './authApi';

const BASE_URL = 'http://localhost:5000/api/user';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  },
});

export const getUserDetails = async (userId) => {
  const response = await apiClient.get(`/${userId}`);
  return response.data;
};

export const updateUserDetails = async (userId, userDetails) => {
  const response = await apiClient.put(`/${userId}`, userDetails);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await apiClient.post('/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post('/register', userData);
  return response.data;
};
