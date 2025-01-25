import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch participants from an API
export const fetchParticipants = createAsyncThunk(
  "video/fetchParticipants",
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/video/rooms/${roomId}/participants`);
      if (!response.ok) {
        throw new Error("Failed to fetch participants");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState: {
    participants: [],
    isMuted: false,
    isVideoOn: true,
    loading: false,
    error: null,
  },
  reducers: {
    addParticipant(state, action) {
      state.participants.push(action.payload);
    },
    removeParticipant(state, action) {
      state.participants = state.participants.filter(
        (participant) => participant.id !== action.payload
      );
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted;
    },
    toggleVideo(state) {
      state.isVideoOn = !state.isVideoOn;
    },
    clearParticipants(state) {
      state.participants = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addParticipant,
  removeParticipant,
  toggleMute,
  toggleVideo,
  clearParticipants,
} = videoSlice.actions;
export default videoSlice.reducer;
