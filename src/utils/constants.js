// Base API URL
export const API_URL = 'https://api.example.com';

// App Settings
export const APP_NAME = 'VideoConnect'; // Name of the application
export const MAX_MESSAGE_LENGTH = 1000; // Maximum length for a chat message
export const DEFAULT_THEME = 'light'; // Default application theme ('light' or 'dark')
export const SUPPORTED_LANGUAGES = ['en', 'fr', 'es', 'de']; // List of supported languages

// Timeouts and Intervals
export const CONNECTION_TIMEOUT = 10000; // Timeout for API requests (in ms)
export const HEARTBEAT_INTERVAL = 30000; // Interval for socket heartbeat (in ms)

// Socket Events
export const SOCKET_EVENTS = {
  NEW_MESSAGE: 'newMessage',
  USER_JOINED: 'userJoined',
  USER_LEFT: 'userLeft',
  START_SCREEN_SHARE: 'startScreenShare',
  STOP_SCREEN_SHARE: 'stopScreenShare',
  TYPING_STARTED: 'typingStarted',
  TYPING_STOPPED: 'typingStopped',
  ROOM_LOCKED: 'roomLocked',
  ROOM_UNLOCKED: 'roomUnlocked',
};

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,
  FETCH_USER: `${API_URL}/users/me`,
  FETCH_PARTICIPANTS: `${API_URL}/rooms/participants`,
  SEND_MESSAGE: `${API_URL}/messages/send`,
  CREATE_ROOM: `${API_URL}/rooms/create`,
};

// Roles and Permissions
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

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// Reactions
export const REACTIONS = ['👍', '🎉', '❤️', '😂', '😮', '😢', '👏', '🔥']; // Default reactions for chat

// Poll Settings
export const POLL_SETTINGS = {
  MAX_OPTIONS: 10, // Maximum number of options in a poll
  ALLOW_ANONYMOUS_VOTING: true, // Allow anonymous voting by default
};

// Video Room Settings
export const VIDEO_ROOM_SETTINGS = {
  MAX_PARTICIPANTS: 50, // Maximum participants in a video room
  ENABLE_CHAT: true, // Enable chat by default
  ENABLE_SCREEN_SHARING: true, // Enable screen sharing by default
  ENABLE_REACTIONS: true, // Enable reactions in video rooms
  DEFAULT_ROLE: USER_ROLES.PARTICIPANT, // Default role assigned to new participants
};

// Default Avatar
export const DEFAULT_AVATAR_URL = 'https://cdn.example.com/default-avatar.png';

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Pattern to validate email addresses
  USERNAME: /^[a-zA-Z0-9_]{3,15}$/, // Pattern for valid usernames (3-15 characters, letters, numbers, underscores)
};

// Date and Time Formats
export const DATE_FORMATS = {
  DISPLAY_DATE: 'MMMM D, YYYY', // Format for displaying dates
  DISPLAY_TIME: 'h:mm A', // Format for displaying times
  FULL_DATE_TIME: 'YYYY-MM-DDTHH:mm:ssZ', // ISO format for date and time
};

// Debugging
export const IS_DEBUG_MODE = process.env.NODE_ENV === 'development'; // Enable debug mode in development environment
