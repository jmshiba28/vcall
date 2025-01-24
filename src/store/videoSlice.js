import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    participants: [],
    isMuted: false,
    isVideoOn: true,
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
  },
});

export const { addParticipant, removeParticipant, toggleMute, toggleVideo } =
  videoSlice.actions;
export default videoSlice.reducer;
