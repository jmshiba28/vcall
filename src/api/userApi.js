import axios from "axios";
import { getAuthToken, refreshToken, logout } from "./authApi";

const BASE_URL = "http://localhost:5000/api/user";

// Axios instance with dynamic token handling
const apiClient = axios.create({
  baseURL: BASE_URL,
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

// Fetch user details
export const getUserDetails = async (userId) => {
  try {
    const response = await apiClient.get(`/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error.response?.data || error.message);
    throw error;
  }
};

// Update user profile (Requires authentication)
export const updateUserDetails = async (userId, userDetails) => {
  try {
    const response = await apiClient.put(`/${userId}`, userDetails);
    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error.response?.data || error.message);
    throw error;
  }
};

// Update password securely
export const updatePassword = async (userId, oldPassword, newPassword) => {
  try {
    const response = await apiClient.put(`/${userId}/password`, { oldPassword, newPassword });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error.response?.data || error.message);
    throw error;
  }
};

// Upload user profile picture
export const uploadUserAvatar = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await apiClient.post(`/${userId}/upload-avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading avatar:", error.response?.data || error.message);
    throw error;
  }
};

// Login user and store token
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};

// Delete user account (Requires authentication)
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
    throw error;
  }
};
