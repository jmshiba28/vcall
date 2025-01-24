// Types for Video Conference functionality

export interface Participant {
    id: string; // Unique identifier for the participant
    name: string; // Name of the participant
    stream?: MediaStream; // Media stream for video/audio
    isMuted: boolean; // Indicates if the participant's audio is muted
    isCameraOff: boolean; // Indicates if the participant's camera is off
  }
  
  export interface VideoRoom {
    id: string; // Unique identifier for the video room
    name: string; // Name of the video room
    participants: Participant[]; // Array of participants in the room
  }
  