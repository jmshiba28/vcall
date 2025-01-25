// Types for User Functionality

export interface User {
  id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address of the user
  username?: string; // Optional username for the user
  avatarUrl?: string; // URL for the user's avatar
  phoneNumber?: string; // Optional phone number
  role: 'admin' | 'moderator' | 'user' | 'guest'; // Role of the user
  permissions?: string[]; // List of permissions assigned to the user
  isActive: boolean; // Whether the user's account is active
  isVerified: boolean; // Whether the user's email is verified
  createdAt: Date; // Date the user account was created
  updatedAt: Date; // Date the user account was last updated
  lastLogin?: Date; // Last login date and time (optional)
  preferences?: UserPreferences; // User-specific preferences (optional)
  twoFactorEnabled?: boolean; // Whether two-factor authentication is enabled
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'; // Preferred theme for the application
  language: string; // Preferred language (e.g., 'en', 'fr', 'es')
  notifications: {
    email: boolean; // Whether email notifications are enabled
    sms: boolean; // Whether SMS notifications are enabled
    push: boolean; // Whether push notifications are enabled
  };
}

export interface AuthResponse {
  token: string; // Authentication token
  refreshToken: string; // Refresh token for renewing access
  user: User; // Authenticated user details
  expiresIn: number; // Token expiration time in seconds
}

export interface RegisterRequest {
  name: string; // Full name of the user
  email: string; // Email address
  password: string; // Password for the account
  confirmPassword: string; // Confirm password field
  phoneNumber?: string; // Optional phone number
}

export interface LoginRequest {
  email: string; // Email address
  password: string; // Password for the account
  rememberMe?: boolean; // Whether to keep the user logged in
}

export interface PasswordResetRequest {
  email: string; // Email address for password reset
}

export interface PasswordResetConfirm {
  token: string; // Password reset token
  newPassword: string; // New password
  confirmPassword: string; // Confirm new password
}

export interface UpdateUserProfileRequest {
  name?: string; // Updated name
  email?: string; // Updated email
  avatarUrl?: string; // Updated avatar URL
  phoneNumber?: string; // Updated phone number
  preferences?: UserPreferences; // Updated preferences
}

export interface ChangePasswordRequest {
  currentPassword: string; // Current password
  newPassword: string; // New password
  confirmPassword: string; // Confirm new password
}

export interface Role {
  id: string; // Unique identifier for the role
  name: string; // Name of the role
  description?: string; // Optional description of the role
  permissions: string[]; // List of permissions associated with the role
}

export interface Permission {
  id: string; // Unique identifier for the permission
  name: string; // Name of the permission
  description?: string; // Optional description of the permission
}
