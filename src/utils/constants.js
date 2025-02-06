// Configuration File for VideoConnect App

// ===============================
// 📌 Base API Configuration
// ===============================
const ENV = process.env.NODE_ENV || 'development';
export const API_URL = ENV === 'production' ? 'https://api.example.com' : 'http://localhost:5000';

// ===============================
// 🔧 App Settings
// ===============================
export const APP_CONFIG = {
  NAME: 'VideoConnect',
  DEFAULT_THEME: 'light',
  SUPPORTED_LANGUAGES: ['en', 'fr', 'es', 'de'],
  MAX_MESSAGE_LENGTH: 1000,
};

// ===============================
// ⏳ Timeouts & Intervals
// ===============================
export const TIMEOUTS = {
  CONNECTION: 10_000, // API request timeout in ms
  HEARTBEAT: 30_000, // Interval for socket heartbeat in ms
};

// ===============================
// 🔌 WebSocket Events
// ===============================
export const SOCKET_EVENTS = Object.freeze({
  NEW_MESSAGE: 'newMessage',
  USER_JOINED: 'userJoined',
  USER_LEFT: 'userLeft',
  SCREEN_SHARE_START: 'startScreenShare',
  SCREEN_SHARE_STOP: 'stopScreenShare',
  TYPING_STARTED: 'typingStarted',
  TYPING_STOPPED: 'typingStopped',
  ROOM_LOCKED: 'roomLocked',
  ROOM_UNLOCKED: 'roomUnlocked',
});

// ===============================
// 🔗 API Endpoints
// ===============================
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
  },
  USERS: {
    ME: `${API_URL}/users/me`,
    PARTICIPANTS: `${API_URL}/rooms/participants`,
  },
  MESSAGES: {
    SEND: `${API_URL}/messages/send`,
  },
  ROOMS: {
    CREATE: `${API_URL}/rooms/create`,
  },
};

// ===============================
// 🔑 Roles & Permissions
// ===============================
export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  PARTICIPANT: 'participant',
  GUEST: 'guest',
};

export const PERMISSIONS = {
  CREATE_ROOM: 'create_room',
  DELETE_ROOM: 'delete_room',
  KICK_USER: 'kick_user',
  SHARE_SCREEN: 'share_screen',
  SEND_MESSAGES: 'send_messages',
};

// ===============================
// 📢 Notification Types
// ===============================
export const NOTIFICATION_TYPES = ['info', 'success', 'warning', 'error'];

// ===============================
// 🎭 Reactions
// ===============================
export const REACTIONS = ['👍', '🎉', '❤️', '😂', '😮', '😢', '👏', '🔥'];

// ===============================
// 📊 Poll Settings
// ===============================
export const POLL_CONFIG = {
  MAX_OPTIONS: 10,
  ALLOW_ANONYMOUS_VOTING: true,
};

// ===============================
// 🎥 Video Room Settings
// ===============================
export const VIDEO_ROOM_SETTINGS = {
  MAX_PARTICIPANTS: 50,
  ENABLE_CHAT: true,
  ENABLE_SCREEN_SHARING: true,
  ENABLE_REACTIONS: true,
  DEFAULT_ROLE: USER_ROLES.PARTICIPANT,
};

// ===============================
// 🖼️ Default Avatar
// ===============================
export const DEFAULT_AVATAR_URL = 'https://cdn.example.com/default-avatar.png';

// ===============================
// 🔍 Regex Patterns
// ===============================
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email pattern
  USERNAME: /^[a-zA-Z0-9_]{3,15}$/, // Valid usernames (3-15 chars, letters, numbers, underscores)
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,}$/, // Min 8 chars, at least one letter & number
};

// ===============================
// 🗓️ Date & Time Formats
// ===============================
export const DATE_FORMATS = {
  DISPLAY_DATE: 'MMMM D, YYYY',
  DISPLAY_TIME: 'h:mm A',
  FULL_DATE_TIME: 'YYYY-MM-DDTHH:mm:ssZ',
};

// ===============================
// 🛠️ Debugging Mode
// ===============================
export const DEBUG = ENV === 'development';

/**
 * ✅ Utility Functions for Configurations
 */

// Function to check if a role has permission
export const hasPermission = (role, permission) => {
  const rolePermissions = {
    admin: Object.keys(PERMISSIONS),
    moderator: ['DELETE_ROOM', 'KICK_USER', 'SEND_MESSAGES'],
    participant: ['SEND_MESSAGES'],
    guest: [],
  };
  return rolePermissions[role]?.includes(permission) || false;
};

// Function to validate email format
export const isValidEmail = (email) => REGEX_PATTERNS.EMAIL.test(email);

// Function to validate username format
export const isValidUsername = (username) => REGEX_PATTERNS.USERNAME.test(username);

// Function to validate password strength
export const isValidPassword = (password) => REGEX_PATTERNS.PASSWORD.test(password);
