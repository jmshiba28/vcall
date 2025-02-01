import axios from "axios";
import { io } from "socket.io-client";
import { getAuthToken, refreshToken, logout } from "./authApi";

const API_URL = "https://your-api-endpoint.com/api/rooms";

// Axios instance with dynamic token handling
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token dynamically to each request
apiClient.interceptors.request.use(
  async (config) => {
    let token = getAuthToken();

    if (!token) {
      token = refreshToken(); // Try refreshing the token
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      logout(); // Logout if no valid token
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// WebSocket connection for real-time room updates
const socket = io(API_URL, {
  auth: { token: getAuthToken() },
  reconnectionAttempts: 5,
  timeout: 10000,
});

export const listenForRoomUpdates = (roomId, callback) => {
  socket.emit("joinRoom", roomId);
  socket.on("roomUpdate", callback);
};

export const stopListeningForRoomUpdates = (roomId) => {
  socket.emit("leaveRoom", roomId);
};

// Fetch room details
export const getRoomDetails = async (roomId) => {
  try {
    const response = await apiClient.get(`/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room details:", error.response?.data || error.message);
    throw error;
  }
};

// Join a room
export const joinRoom = async (roomId) => {
  try {
    const response = await apiClient.post(`/join/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error joining room:", error.response?.data || error.message);
    throw error;
  }
};

// Leave a room
export const leaveRoom = async (roomId) => {
  try {
    const response = await apiClient.post(`/leave/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error leaving room:", error.response?.data || error.message);
    throw error;
  }
};

// Send a message to a room
export const sendMessage = async (roomId, message) => {
  try {
    const response = await apiClient.post(`/message/${roomId}`, { message });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch messages with pagination
export const fetchMessages = async (roomId, page = 1, limit = 20) => {
  try {
    const response = await apiClient.get(`/messages/${roomId}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error.response?.data || error.message);
    throw error;
  }
};
