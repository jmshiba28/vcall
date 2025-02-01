import axios from "axios";
import { getAuthToken, refreshToken, logout } from "./authApi";

const API_URL = "https://your-api-endpoint.com/video";

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
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// Create a new video room
export const createRoom = async (roomData) => {
  try {
    const response = await apiClient.post("/create", roomData);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error.response?.data || error.message);
    throw error;
  }
};

// Get room details by ID
export const getRoomDetails = async (roomId) => {
  try {
    const response = await apiClient.get(`/details/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching room details:", error.response?.data || error.message);
    throw error;
  }
};

// Join an existing video room
export const joinRoom = async (roomId, userData) => {
  try {
    const response = await apiClient.post(`/join/${roomId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error joining room:", error.response?.data || error.message);
    throw error;
  }
};

// Start video conference
export const startVideoConference = async (roomId) => {
  try {
    const response = await apiClient.post(`/start/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error starting video conference:", error.response?.data || error.message);
    throw error;
  }
};

// End a video conference (For Host/Admin)
export const endVideoConference = async (roomId) => {
  try {
    const response = await apiClient.post(`/end/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error ending video conference:", error.response?.data || error.message);
    throw error;
  }
};

// Mute a user in the room (For Host/Admin)
export const muteUser = async (roomId, userId) => {
  try {
    const response = await apiClient.post(`/mute/${roomId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error muting user:", error.response?.data || error.message);
    throw error;
  }
};

// Remove a user from the room (For Host/Admin)
export const removeUser = async (roomId, userId) => {
  try {
    const response = await apiClient.post(`/remove/${roomId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing user:", error.response?.data || error.message);
    throw error;
  }
};

// Start recording the meeting
export const startRecording = async (roomId) => {
  try {
    const response = await apiClient.post(`/record/start/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error starting recording:", error.response?.data || error.message);
    throw error;
  }
};

// Stop recording the meeting
export const stopRecording = async (roomId) => {
  try {
    const response = await apiClient.post(`/record/stop/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error stopping recording:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch recorded video files
export const getRecordings = async (roomId) => {
  try {
    const response = await apiClient.get(`/recordings/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recordings:", error.response?.data || error.message);
    throw error;
  }
};
