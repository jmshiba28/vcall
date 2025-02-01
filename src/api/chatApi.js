import axios from "axios";
import { getAuthToken, refreshToken, logout } from "./authApi";
import { io } from "socket.io-client";

const API_URL = "https://your-api-endpoint.com/chat";

// Initialize Axios with dynamic token injection
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to request headers dynamically
apiClient.interceptors.request.use(
  async (config) => {
    let token = getAuthToken();

    if (!token) {
      token = refreshToken(); // Try refreshing token if expired
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      logout(); // Log out if no valid token
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized responses globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// WebSocket connection for real-time updates
const socket = io(API_URL, {
  auth: { token: getAuthToken() },
  reconnectionAttempts: 5,
  timeout: 10000,
});

export const listenForMessages = (chatId, callback) => {
  socket.emit("joinChat", chatId);
  socket.on("newMessage", callback);
};

export const stopListeningForMessages = (chatId) => {
  socket.emit("leaveChat", chatId);
};

// Create a new chat
export const createChat = async (chatData) => {
  try {
    const response = await apiClient.post("/create", chatData);
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all chats for a user
export const getChats = async () => {
  try {
    const response = await apiClient.get("/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error.response?.data || error.message);
    throw error;
  }
};

// Send a message in a chat
export const sendMessage = async (messageData) => {
  try {
    const response = await apiClient.post("/send", messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch chat messages with pagination
export const fetchMessages = async (chatId, page = 1, limit = 20) => {
  try {
    const response = await apiClient.get(`/messages/${chatId}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error.response?.data || error.message);
    throw error;
  }
};
