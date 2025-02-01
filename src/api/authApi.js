import bcrypt from 'bcryptjs';  // For password hashing
import jwt from 'jsonwebtoken';  // For JWT handling

const usersDatabase = []; // Simulating a user database
const SECRET_KEY = 'your-secret-key'; // Secret key for JWT

// Helper function to generate JWT token
const generateAuthToken = (user) => {
  const payload = { email: user.email, name: user.name };
  const options = { expiresIn: '1h' }; // Token expires in 1 hour
  return jwt.sign(payload, SECRET_KEY, options);
};

// Helper function to validate email format
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Login function
export const login = async (email, password) => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format.');
  }

  const user = usersDatabase.find((u) => u.email === email);
  if (!user) {
    throw new Error('User not found.');
  }

  // Compare the entered password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  // Generate JWT token for the user
  const token = generateAuthToken(user);
  user.token = token; // Add the token to the user object

  // Store user and token in localStorage
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

// Registration function
export const register = async (email, password, name) => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format.');
  }

  const userExists = usersDatabase.some((u) => u.email === email);
  if (userExists) {
    throw new Error('User already exists.');
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { email, password: hashedPassword, name };
  usersDatabase.push(newUser);

  return newUser;
};

// Logout function
export const logout = () => {
  localStorage.removeItem('user');
};

// Get the currently authenticated user
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Check if a user is authenticated
export const isAuthenticated = () => {
  const user = getUser();
  if (!user || !user.token) return false;

  // Verify the JWT token
  try {
    jwt.verify(user.token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};

// Refresh token function (to extend the expiration time of the current token)
export const refreshToken = () => {
  const user = getUser();
  if (!user || !user.token) return null;

  try {
    const decoded = jwt.verify(user.token, SECRET_KEY, { ignoreExpiration: true });
    const refreshedToken = generateAuthToken({ email: decoded.email, name: decoded.name });
    user.token = refreshedToken;
    localStorage.setItem('user', JSON.stringify(user));
    return refreshedToken;
  } catch (error) {
    return null;
  }
};

// Function to get the authentication token
export const getAuthToken = () => {
  const user = getUser();
  return user ? user.token : null;
};
