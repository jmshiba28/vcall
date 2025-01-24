import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    activeChat: null,
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setActiveChat(state, action) {
      state.activeChat = action.payload;
    },
    clearChat(state) {
      state.messages = [];
      state.activeChat = null;
    },
  },
});

export const { addMessage, setActiveChat, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
