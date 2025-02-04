// Types for Video Conference Functionality

export interface Participant {
  id: string; // Unique identifier for the participant
  name: string; // Name of the participant
  avatarUrl?: string; // URL for the participant's avatar (optional)
  stream?: MediaStream; // Media stream for video/audio
  isMuted: boolean; // Indicates if the participant's audio is muted
  isCameraOff: boolean; // Indicates if the participant's camera is off
  role: 'host' | 'co-host' | 'participant' | 'guest'; // Role of the participant in the video room
  isSharingScreen?: boolean; // Indicates if the participant is sharing their screen
  isRaisedHand?: boolean; // Indicates if the participant has raised their hand
  reactions?: Reaction[]; // Array of reactions (e.g., emojis) from the participant
  isSpeaking?: boolean; // Indicates if the participant is currently speaking
  chatMessages?: ChatMessage[]; // Chat messages sent by the participant
  connectionStats?: ConnectionStats; // Real-time network stats for the participant
}

export interface Reaction {
  emoji: string; // Emoji used for the reaction
  timestamp: Date; // Time when the reaction was added
  participantId: string; // ID of the participant who added the reaction
}

export interface VideoRoom {
  id: string; // Unique identifier for the video room
  name: string; // Name of the video room
  hostId: string; // ID of the host participant
  participants: Participant[]; // Array of participants in the room
  isRecording: boolean; // Indicates if the video room is being recorded
  isLocked: boolean; // Indicates if the video room is locked
  createdAt: Date; // Timestamp when the room was created
  updatedAt: Date; // Timestamp when the room was last updated
  settings: VideoRoomSettings; // Settings for the video room
  chatMessages?: ChatMessage[]; // Array of chat messages exchanged in the room
  polls?: Poll[]; // Array of polls conducted in the room
  breakoutRooms?: BreakoutRoom[]; // Array of breakout rooms (if applicable)
  isLiveStreamed?: boolean; // Indicates if the room is being live-streamed
}

export interface VideoRoomSettings {
  maxParticipants: number; // Maximum number of participants allowed
  enableChat: boolean; // Indicates if chat is enabled
  enableScreenSharing: boolean; // Indicates if screen sharing is enabled
  enableReactions: boolean; // Indicates if reactions are enabled
  enableRecording: boolean; // Indicates if recording is enabled
  enableLiveStreaming: boolean; // Indicates if live streaming is enabled
  defaultRole: 'participant' | 'guest'; // Default role assigned to new participants
  autoMuteNewParticipants: boolean; // Whether new participants should be muted by default
  allowUnmuting: boolean; // Whether participants can unmute themselves
  allowVideoToggle: boolean; // Whether participants can toggle their video
}

export interface ChatMessage {
  id: string; // Unique identifier for the chat message
  senderId: string; // ID of the sender
  content: string; // Content of the message
  timestamp: Date; // Time when the message was sent
  isSystemMessage?: boolean; // Indicates if the message is a system message (e.g., "User joined")
  isPrivate?: boolean; // Indicates if the message was sent privately (to a specific participant)
  isEdited?: boolean; // Whether the message has been edited
  editedTimestamp?: Date; // Timestamp when the message was edited
}

export interface Poll {
  id: string; // Unique identifier for the poll
  question: string; // Poll question
  options: PollOption[]; // Array of options for the poll
  createdBy: string; // ID of the participant who created the poll
  isAnonymous: boolean; // Indicates if the poll is anonymous
  createdAt: Date; // Timestamp when the poll was created
  results?: PollResult[]; // Array of poll results (optional)
  isActive: boolean; // Indicates if the poll is currently active
}

export interface PollOption {
  id: string; // Unique identifier for the option
  text: string; // Text of the option
}

export interface PollResult {
  optionId: string; // ID of the option
  votes: number; // Number of votes for the option
}

export interface BreakoutRoom {
  id: string; // Unique identifier for the breakout room
  name: string; // Name of the breakout room
  participants: Participant[]; // Array of participants in the breakout room
  createdAt: Date; // Timestamp when the breakout room was created
  isLocked: boolean; // Indicates if the breakout room is locked
  hostId: string; // ID of the host for the breakout room
}

export interface ScreenSharing {
  participantId: string; // ID of the participant sharing their screen
  stream: MediaStream; // Media stream of the shared screen
  startedAt: Date; // Timestamp when screen sharing started
  isActive: boolean; // Indicates if screen sharing is currently active
  screenId?: string; // Unique identifier for the screen being shared (optional)
}

export interface Recording {
  id: string; // Unique identifier for the recording
  roomId: string; // ID of the video room being recorded
  startedAt: Date; // Timestamp when recording started
  endedAt?: Date; // Timestamp when recording ended (optional)
  downloadUrl?: string; // URL to download the recording (optional)
  cloudStorageUrl?: string; // Cloud storage URL where the recording is stored (optional)
  isProcessing?: boolean; // Indicates if the recording is still being processed
}

export interface TypingIndicator {
  participantId: string; // ID of the participant typing in chat
  isTyping: boolean; // Indicates if the participant is typing
  timestamp: Date; // Time when the typing status was updated
}

export interface ConnectionStats {
  participantId: string; // ID of the participant
  networkQuality: number; // Network quality (e.g., 1-5 scale)
  latency: number; // Latency in milliseconds
  bitrate: number; // Bitrate in kbps
  packetLoss: number; // Packet loss percentage
  jitter?: number; // Jitter in milliseconds (optional)
  frameRate?: number; // Frame rate of the video stream (optional)
}

export interface LiveStream {
  id: string; // Unique identifier for the live stream
  streamUrl: string; // URL to view the live stream
  startedAt: Date; // Timestamp when the live stream started
  endedAt?: Date; // Timestamp when the live stream ended
  participants: Participant[]; // Participants actively viewing the stream
  chatMessages?: ChatMessage[]; // Chat messages exchanged during the live stream
  isRecording: boolean; // Whether the live stream is being recorded
}
