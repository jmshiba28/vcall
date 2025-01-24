// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/video"; // Update the base URL as per your backend

// export const getRoomDetails = async (roomId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/room/${roomId}`);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// export const createRoom = async (roomDetails) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/room/create`, roomDetails);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// export const joinRoom = async (roomId, userId) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/room/join`, { roomId, userId });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };






// /src/api/videoApi.js
import axios from 'axios';

const API_URL = 'https://your-api-endpoint.com/video';

// Create a video conference room
export const createRoom = async (roomData) => {
  const response = await axios.post(`${API_URL}/create`, roomData);
  return response.data;
};

// Get room details
export const getRoomDetails = async (roomId) => {
  const response = await axios.get(`${API_URL}/details/${roomId}`);
  return response.data;
};

// Join a video conference room
export const joinRoom = async (roomId, userData) => {
  const response = await axios.post(`${API_URL}/join/${roomId}`, userData);
  return response.data;
};

// Start a video conference
export const startVideoConference = async (roomId) => {
  const response = await axios.post(`${API_URL}/start/${roomId}`);
  return response.data;
};
