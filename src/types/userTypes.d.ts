// Types for User Functionality

export interface User {
  id: string; // Unique identifier for the user
  name: string; // Full name of the user
  email: string; // Email address of the user
  username?: string; // Optional username for the user
  avatarUrl?: string; // URL for the user's avatar
  phoneNumber?: string; // Optional phone number
  role: 'admin' | 'moderator' | 'user' | 'guest'; // Role of the user
  permissions: string[]; // List of permissions granted to the user
  isActive: boolean; // Whether the user's account is active
  isVerified: boolean; // Whether the user's email is verified
  createdAt: Date; // Date the user account was created
  updatedAt: Date; // Date the user account was last updated
  lastLogin?: Date; // Last login date and time (optional)
  preferences?: UserPreferences; // User-specific preferences (optional)
  twoFactorEnabled?: boolean; // Whether two-factor authentication is enabled
  isSuspended?: boolean; // Whether the user is suspended (optional)
  lastPasswordChange?: Date; // Date when the user last changed their password
  failedLoginAttempts?: number; // Number of failed login attempts (for security)
  metadata?: { [key: string]: any }; // Additional custom metadata about the user
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'; // Preferred theme for the application
  language: string; // Preferred language (e.g., 'en', 'fr', 'es')
  notifications: {
    email: boolean; // Whether email notifications are enabled
    sms: boolean; // Whether SMS notifications are enabled
    push: boolean; // Whether push notifications are enabled
    web: boolean; // Whether web notifications are enabled
  };
  privacySettings: {
    profileVisibility: 'public' | 'friends' | 'private'; // Profile visibility
    showLastSeen: boolean; // Whether to show last seen status
    allowDirectMessages: boolean; // Whether to allow direct messages from anyone
  };
}

export interface AuthResponse {
  token: string; // Authentication token
  refreshToken: string; // Refresh token for renewing access
  user: User; // Authenticated user details
  expiresIn: number; // Token expiration time in seconds
  tokenType: 'Bearer' | 'JWT'; // Type of the token
}

export interface RegisterRequest {
  name: string; // Full name of the user
  email: string; // Email address
  password: string; // Password for the account
  confirmPassword: string; // Confirm password field
  phoneNumber?: string; // Optional phone number
  username?: string; // Optional username for the account
  recaptchaToken?: string; // Recaptcha token for verification (optional)
}

export interface LoginRequest {
  email: string; // Email address
  password: string; // Password for the account
  rememberMe?: boolean; // Whether to keep the user logged in
  recaptchaToken?: string; // Recaptcha token for verification (optional)
}

export interface PasswordResetRequest {
  email: string; // Email address for password reset
  recaptchaToken?: string; // Recaptcha token for verification (optional)
}

export interface PasswordResetConfirm {
  token: string; // Password reset token
  newPassword: string; // New password
  confirmPassword: string; // Confirm new password
  recaptchaToken?: string; // Recaptcha token for verification (optional)
}

export interface UpdateUserProfileRequest {
  name?: string; // Updated name
  email?: string; // Updated email
  avatarUrl?: string; // Updated avatar URL
  phoneNumber?: string; // Updated phone number
  preferences?: UserPreferences; // Updated preferences
  username?: string; // Updated username
  isActive?: boolean; // Updated account status
  role?: 'admin' | 'moderator' | 'user' | 'guest'; // Updated role (optional)
}

export interface ChangePasswordRequest {
  currentPassword: string; // Current password
  newPassword: string; // New password
  confirmPassword: string; // Confirm new password
  recaptchaToken?: string; // Recaptcha token for verification (optional)
}

export interface Role {
  id: string; // Unique identifier for the role
  name: string; // Name of the role
  description?: string; // Optional description of the role
  permissions: string[]; // List of permissions associated with the role
  createdAt: Date; // Date when the role was created
  updatedAt: Date; // Date when the role was last updated
  metadata?: { [key: string]: any }; // Optional custom metadata for the role
}

export interface Permission {
  id: string; // Unique identifier for the permission
  name: string; // Name of the permission
  description?: string; // Optional description of the permission
  createdAt: Date; // Date when the permission was created
  updatedAt: Date; // Date when the permission was last updated
  metadata?: { [key: string]: any }; // Optional custom metadata for the permission
}

export interface RoleAssignment {
  userId: string; // ID of the user
  roleId: string; // ID of the assigned role
  assignedAt: Date; // Date when the role was assigned
  assignedBy: string; // ID of the user who assigned the role
}

export interface Session {
  id: string; // Unique session identifier
  userId: string; // ID of the user
  ipAddress: string; // IP address from where the session was created
  userAgent: string; // User agent (browser/device) information
  createdAt: Date; // Date when the session was created
  lastActivityAt: Date; // Date when the session was last active
  expiresAt: Date; // Date when the session will expire
}

export interface TwoFactorSetupRequest {
  userId: string; // ID of the user
  method: 'sms' | 'email' | 'authenticatorApp'; // Method of 2FA (SMS, email, or app)
  recaptchaToken?: string; // Recaptcha token for verification (optional)
}

export interface TwoFactorVerifyRequest {
  userId: string; // ID of the user
  code: string; // Verification code from the 2FA method
}

export interface TwoFactorResponse {
  enabled: boolean; // Whether 2FA is enabled
  method: 'sms' | 'email' | 'authenticatorApp'; // Method of 2FA used
  lastVerifiedAt?: Date; // Last verification time
}

export interface UserAuditLog {
  id: string; // Unique identifier for the log entry
  userId: string; // ID of the user who performed the action
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'passwordChange'; // Type of action
  timestamp: Date; // Time when the action was performed
  ipAddress: string; // IP address from where the action was performed
  userAgent: string; // User agent (browser/device) information
  details?: string; // Additional details about the action (optional)
}
