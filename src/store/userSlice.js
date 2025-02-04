import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to get token from localStorage
const getStoredUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: getStoredUser(),
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    role: localStorage.getItem("role") || "guest", // Default role
    loading: false,
    error: null,
  },
  reducers: {
    setUserDetails(state, action) {
      const { user, token, role } = action.payload;
      state.userDetails = user;
      state.token = token;
      state.isAuthenticated = true;
      state.role = role;

      // Store in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    },
    clearUserDetails(state) {
      state.userDetails = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = "guest";

      // Clear from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
    logoutUser(state) {
      state.userDetails = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = "guest";

      // Remove user data from localStorage
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserDetails, clearUserDetails, logoutUser } = userSlice.actions;
export default userSlice.reducer;
