// Types for Chat Functionality

export interface User {
  id: string; // Unique identifier for the user
  name: string; // Display name of the user
  avatarUrl?: string; // URL for the user's avatar (optional)
  isOnline: boolean; // Online status of the user
  role?: 'admin' | 'moderator' | 'participant'; // Role of the user in the chat room (optional)
  lastActive?: Date; // Last active time (optional)
  statusMessage?: string; // Custom status message (optional)
  metadata?: { [key: string]: any }; // Additional metadata for the user (optional)
}

export interface Reaction {
  emoji: string; // Emoji used for the reaction
  userId: string; // ID of the user who reacted
  timestamp: Date; // Time when the reaction was added
}

export interface Message {
  id: string; // Unique identifier for the message
  senderId: string; // ID of the user who sent the message
  content: string; // Text content of the message
  timestamp: Date; // Time the message was sent
  status: 'sent' | 'delivered' | 'read'; // Status of the message
  reactions?: Reaction[]; // Array of reactions to the message (optional)
  isEdited?: boolean; // Whether the message has been edited (optional)
  isDeleted?: boolean; // Whether the message has been deleted (optional)
  editedTimestamp?: Date; // Timestamp of when the message was edited (optional)
  parentId?: string; // ID of the message being replied to (optional)
}

export interface ChatRoom {
  id: string; // Unique identifier for the chat room
  name: string; // Name of the chat room
  participants: User[]; // List of participants in the chat room
  messages: Message[]; // Array of messages in the chat room
  createdAt: Date; // Date when the chat room was created
  updatedAt: Date; // Date when the chat room was last updated
  isPrivate?: boolean; // Whether the chat room is private (optional)
  lastMessage?: Message; // The last message sent in the chat room (optional)
  createdBy: string; // ID of the user who created the chat room
  roomMetadata?: { [key: string]: any }; // Custom metadata for the chat room (optional)
  archivedAt?: Date; // Date when the chat room was archived (optional)
  type: 'group' | 'direct' | 'support'; // Type of the chat room (group, direct message, or support)
}

export interface TypingIndicator {
  roomId: string; // ID of the chat room
  userId: string; // ID of the user who is typing
  isTyping: boolean; // Typing status
  timestamp: Date; // Time when typing status was updated
}

export interface ChatEvent {
  type: 'message' | 'reaction' | 'typing' | 'userJoined' | 'userLeft' | 'roomUpdated'; // Type of the event
  payload: any; // Payload of the event
  timestamp: Date; // Time when the event was triggered
}

/**
 * Types for additional features
 */

// File attachments in messages
export interface Attachment {
  id: string; // Unique identifier for the attachment
  fileName: string; // Name of the file
  fileType: string; // Type of the file (e.g., image/png, application/pdf)
  fileUrl: string; // URL to access the file
  uploadedBy: string; // ID of the user who uploaded the file
  uploadedAt: Date; // Time when the file was uploaded
  size?: number; // Size of the file in bytes (optional)
  previewUrl?: string; // Optional preview URL for images or videos (optional)
  metadata?: { [key: string]: any }; // Custom metadata for the attachment (optional)
}

export interface ExtendedMessage extends Message {
  attachments?: Attachment[]; // Array of file attachments (optional)
  isPinned?: boolean; // Whether the message is pinned (optional)
  mentions?: string[]; // List of user IDs mentioned in the message (optional)
  threadId?: string; // Thread ID for replies (optional)
}

// Real-time presence update for users
export interface PresenceUpdate {
  userId: string; // ID of the user
  isOnline: boolean; // Whether the user is online
  lastSeen?: Date; // Last seen time of the user (optional)
  lastActive?: Date; // Last active time of the user (optional)
  statusMessage?: string; // Custom status message of the user (optional)
}

// Ban and mute functionality
export interface UserBan {
  userId: string; // ID of the user being banned
  bannedBy: string; // ID of the user who banned the user
  reason?: string; // Optional reason for the ban
  bannedAt: Date; // Time when the user was banned
  duration?: number; // Duration of the ban in milliseconds (optional)
}

export interface UserMute {
  userId: string; // ID of the user being muted
  mutedBy: string; // ID of the user who muted the user
  reason?: string; // Optional reason for the mute
  mutedAt: Date; // Time when the user was muted
  duration?: number; // Duration of the mute in milliseconds (optional)
  expiresAt?: Date; // Optional expiration time for the mute (optional)
}

// Notification types for messages
export interface MessageNotification {
  messageId: string; // ID of the message
  senderId: string; // ID of the sender
  roomId: string; // ID of the chat room
  content: string; // Content of the message
  notificationType: 'mention' | 'reaction' | 'message'; // Type of the notification
  timestamp: Date; // Time when the notification was sent
  isRead: boolean; // Whether the notification has been read
}

// Threaded conversations for messages
export interface MessageThread {
  parentMessageId: string; // ID of the parent message
  threadId: string; // Unique ID for the thread
  messages: Message[]; // Messages in the thread
  createdAt: Date; // Time when the thread was created
  createdBy: string; // ID of the user who created the thread
}

// Chat Analytics (optional)
export interface ChatAnalytics {
  roomId: string; // ID of the chat room
  totalMessages: number; // Total number of messages in the room
  activeUsers: number; // Number of active users in the room
  topUsers: User[]; // List of top active users based on message count
  peakActivityTime: Date; // Time of the peak activity
  averageMessageLength: number; // Average length of the messages in the chat room
  reactionsCount: number; // Number of reactions in the chat room
  mentionsCount: number; // Number of mentions in the chat room
}

// Room activity logging (for auditing purposes)
export interface RoomActivityLog {
  roomId: string; // ID of the chat room
  action: 'create' | 'update' | 'delete' | 'join' | 'leave' | 'message' | 'reaction'; // Type of action
  userId: string; // ID of the user performing the action
  timestamp: Date; // Time when the action was performed
  details?: string; // Additional details about the action (optional)
}

