// Types for User functionality

export interface User {
    id: string; // Unique identifier for the user
    name: string; // Name of the user
    email: string; // Email of the user
    avatarUrl?: string; // URL for the user's avatar
  }
  
  export interface AuthResponse {
    token: string; // Authentication token
    user: User; // User details
  }
  