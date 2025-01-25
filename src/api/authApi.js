// authapi.js
const usersDatabase = []; // Simulating a user database

export const login = async (email, password) => {
  const user = usersDatabase.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password.');
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
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem('user'));
};

export const getAuthToken = () => {
  const user = getUser();
  return user ? user.token : null;
};
