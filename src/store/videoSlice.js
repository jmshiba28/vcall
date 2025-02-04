import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// WebSocket connection for real-time participant updates
let socket = null;

// Async thunk to fetch participants
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

// Async thunk to start a video call
export const startVideoCall = createAsyncThunk(
  "video/startVideoCall",
  async ({ userId, roomId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/video/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, roomId }),
      });

      if (!response.ok) {
        throw new Error("Failed to start video call");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Video slice
const videoSlice = createSlice({
  name: "video",
  initialState: {
    participants: [],
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    isCallActive: false,
    role: "participant", // Default role
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
    toggleScreenShare(state) {
      state.isScreenSharing = !state.isScreenSharing;
    },
    setRole(state, action) {
      state.role = action.payload; // "host" or "participant"
    },
    endCall(state) {
      state.isCallActive = false;
      state.participants = [];
    },
    initializeWebSocket(state, action) {
      const { roomId } = action.payload;
      if (!socket) {
        socket = new WebSocket(`wss://yourserver.com/video/${roomId}`);

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === "participantJoined") {
            state.participants.push(data.participant);
          } else if (data.type === "participantLeft") {
            state.participants = state.participants.filter(
              (p) => p.id !== data.participantId
            );
          }
        };
      }
    },
    closeWebSocket(state) {
      if (socket) {
        socket.close();
        socket = null;
      }
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
      })
      .addCase(startVideoCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startVideoCall.fulfilled, (state, action) => {
        state.loading = false;
        state.isCallActive = true;
        state.role = action.payload.role; // Assigns role based on API response
      })
      .addCase(startVideoCall.rejected, (state, action) => {
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
  toggleScreenShare,
  setRole,
  endCall,
  initializeWebSocket,
  closeWebSocket,
} = videoSlice.actions;
export default videoSlice.reducer;
