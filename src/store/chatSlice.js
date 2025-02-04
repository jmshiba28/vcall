import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import store from "./store"; // Adjust the path as necessary

// Initialize WebSocket
const socket = io("https://your-chat-server.com");

// Async action to fetch chat messages
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async action to send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, message }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: JSON.parse(localStorage.getItem("messages")) || [],
    activeChat: null,
    loading: false,
    error: null,
    unreadMessages: {},
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
      localStorage.setItem("messages", JSON.stringify(state.messages));
    },
    setActiveChat(state, action) {
      state.activeChat = action.payload;
      state.messages = []; // Clear messages when switching chats
      if (state.unreadMessages[action.payload]) {
        state.unreadMessages[action.payload] = 0; // Mark as read
      }
    },
    clearChat(state) {
      state.messages = [];
      state.activeChat = null;
      localStorage.removeItem("messages");
    },
    receiveMessage(state, action) {
      if (state.activeChat === action.payload.chatId) {
        state.messages.push(action.payload);
      } else {
        // Increment unread message count
        state.unreadMessages[action.payload.chatId] =
          (state.unreadMessages[action.payload.chatId] || 0) + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        localStorage.setItem("messages", JSON.stringify(action.payload));
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        socket.emit("newMessage", action.payload); // Emit message via WebSocket
        localStorage.setItem("messages", JSON.stringify(state.messages));
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

import store from "./store"; // Adjust the path as necessary

// Listen for incoming messages via WebSocket
socket.on("message", (message) => {
  store.dispatch(chatSlice.actions.receiveMessage(message));
});

export const { addMessage, setActiveChat, clearChat, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
