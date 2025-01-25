import axios from 'axios';

// Define the base URL for the API requests
const API_URL = 'https://your-api-endpoint.com/api/rooms';  // Replace with your actual API URL

// Axios instance with basic setup
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`  // Assuming token-based authentication
  }
});

// Get room details
export const getRoomDetails = async (roomId) => {
  try {
    const response = await apiClient.get(`/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room details:', error.response ? error.response.data : error.message);
    throw new Error('Unable to fetch room details');
  }
};

// Join a room
export const joinRoom = async (roomId) => {
  try {
    const response = await apiClient.post(`/join/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error joining room:', error.response ? error.response.data : error.message);
    throw new Error('Unable to join the room');
  }
};

// Leave a room
export const leaveRoom = async (roomId) => {
  try {
    const response = await apiClient.post(`/leave/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error leaving room:', error.response ? error.response.data : error.message);
    throw new Error('Unable to leave the room');
  }
};

// Send a message to the room
export const sendMessage = async (roomId, message) => {
  try {
    const response = await apiClient.post(`/message/${roomId}`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    throw new Error('Unable to send message');
  }
};

// WebSocket connection for real-time updates
let socket = null;

export const createSocketConnection = (roomId) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket;
  }

  socket = new WebSocket(`wss://your-websocket-endpoint.com/rooms/${roomId}`);
  
  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onclose = (event) => {
    console.log('WebSocket closed:', event);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received message from WebSocket:', data);
    // Handle incoming data (update UI with new chat messages or participants)
  };

  return socket;
};

// Send a message via WebSocket
export const sendSocketMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'message', content: message }));
  } else {
    console.error('WebSocket is not connected');
  }
};

// Placeholder for video chat functionality
export const startVideoCall = (roomId) => {
  console.log(`Starting video call in room: ${roomId}`);
  // Integration with video services (WebRTC, Zoom API, etc.)
};

export const stopVideoCall = () => {
  console.log('Ending video call');
};

export const changeUserRole = async (roomId, userId, newRole) => {
  try {
    const response = await apiClient.post(`/role/${roomId}`, { userId, newRole });
    return response.data;
  } catch (error) {
    console.error('Error changing user role:', error.response ? error.response.data : error.message);
    throw new Error('Unable to change user role');
  }
};
