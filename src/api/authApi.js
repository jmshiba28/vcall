// Mock authentication functions (replace with real API requests)
const usersDatabase = []; // This will simulate a user database

export const login = async (email, password) => {
  const user = usersDatabase.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password.');
  // Simulate setting user info after successful login (this can be replaced with actual token management)
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const register = async (email, password, name) => {
  const userExists = usersDatabase.some(u => u.email === email);
  if (userExists) throw new Error('User already exists.');
  const newUser = { email, password, name };
  usersDatabase.push(newUser);
  return newUser;
};

export const logout = () => {
  localStorage.removeItem('user'); // Remove user data from localStorage on logout
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null; // Return user info if authenticated
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem('user')); // Check if there's a user in localStorage
};
