// Types for Chat functionality

export interface Message {
    id: string; // Unique identifier for the message
    senderId: string; // ID of the user who sent the message
    content: string; // Text content of the message
    timestamp: Date; // Time the message was sent
  }
  
  export interface ChatRoom {
    id: string; // Unique identifier for the chat room
    name: string; // Name of the chat room
    participants: string[]; // List of user IDs participating in the chat room
    messages: Message[]; // Array of messages in the chat room
  }
  