// Types for Chat Functionality

export interface User {
  id: string; // Unique identifier for the user
  name: string; // Display name of the user
  avatarUrl?: string; // URL for the user's avatar (optional)
  isOnline: boolean; // Online status of the user
  role?: 'admin' | 'moderator' | 'participant'; // Role of the user in the chat room (optional)
}

export interface Reaction {
  emoji: string; // Emoji used for the reaction
  userId: string; // ID of the user who reacted
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
}

export interface TypingIndicator {
  roomId: string; // ID of the chat room
  userId: string; // ID of the user who is typing
  isTyping: boolean; // Typing status
}

export interface ChatEvent {
  type: 'message' | 'reaction' | 'typing' | 'userJoined' | 'userLeft'; // Type of the event
  payload: any; // Payload of the event
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
}

// Extended message to include attachments
export interface ExtendedMessage extends Message {
  attachments?: Attachment[]; // Array of file attachments (optional)
}

// Real-time presence update for users
export interface PresenceUpdate {
  userId: string; // ID of the user
  isOnline: boolean; // Whether the user is online
  lastSeen?: Date; // Last seen time of the user (optional)
}

