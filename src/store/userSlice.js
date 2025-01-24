import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    isAuthenticated: false,
  },
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
      state.isAuthenticated = true;
    },
    clearUserDetails(state) {
      state.userDetails = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
