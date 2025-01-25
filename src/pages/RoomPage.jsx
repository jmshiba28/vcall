import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomDetails, joinRoom, leaveRoom, startVideoCall, stopVideoCall } from '../api/roomApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import useWebSocket from '../hooks/useWebSocket';  // Correct import for default export

const RoomPage = () => {
  const { roomid } = useParams();  // Get the roomid from the URL
  const [roomDetails, setRoomDetails] = useState(null);  // To hold room data
  const [isJoined, setIsJoined] = useState(false);  // Track if the user has joined the room
  const [isLoading, setIsLoading] = useState(true);  // Loading state for room details
  const [error, setError] = useState('');  // Error handling state
  const [message, setMessage] = useState('');  // Message input state
  const [messages, setMessages] = useState([]);  // List of messages
  const [videoCallActive, setVideoCallActive] = useState(false);  // Video call state

  const { isConnected, messages: socketMessages, sendMessage } = useWebSocket(roomid);  // WebSocket custom hook to manage connection

  const messageInputRef = useRef(null);  // For auto-focusing on the message input

  // Fetch room details when the component mounts or when roomid changes
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const details = await getRoomDetails(roomid);
        setRoomDetails(details);
      } catch (err) {
        setError('Failed to fetch room details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomid]);

  // Handle the logic for joining a room
  const handleJoinRoom = async () => {
    try {
      await joinRoom(roomid);
      setIsJoined(true);
    } catch (err) {
      setError('Failed to join the room.');
    }
  };

  // Handle the logic for leaving the room
  const handleLeaveRoom = async () => {
    try {
      await leaveRoom(roomid);
      setIsJoined(false);
    } catch (err) {
      setError('Failed to leave the room.');
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        sendMessage(message);  // Send the message through WebSocket
        setMessages((prevMessages) => [...prevMessages, { content: message, sender: 'You' }]);
        setMessage('');
      } catch (err) {
        setError('Failed to send message.');
      }
    }
  };

  // Start video call
  const handleStartVideoCall = () => {
    startVideoCall(roomid);
    setVideoCallActive(true);
  };

  // Stop video call
  const handleStopVideoCall = () => {
    stopVideoCall();
    setVideoCallActive(false);
  };

  // Update messages when new ones arrive from the WebSocket
  useEffect(() => {
    if (socketMessages && socketMessages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...socketMessages]);
    }
  }, [socketMessages]);

  if (isLoading) {
    return <LoadingSpinner />;  // Display loading spinner while fetching room details
  }

  return (
    <div className="room-page">
      <Navbar />
      <div className="room-content container">
        {error && <p className="error">{error}</p>}
        {roomDetails && (
          <>
            <h1 className="room-title">{roomDetails.name}</h1>
            <p className="room-description">{roomDetails.description}</p>

            <div className="room-actions">
              {isJoined ? (
                <button className="leave-button" onClick={handleLeaveRoom}>
                  Leave Room
                </button>
              ) : (
                <button className="join-button" onClick={handleJoinRoom}>
                  Join Room
                </button>
              )}
            </div>

            <div className="room-participants">
              <h3>Participants:</h3>
              <ul>
                {roomDetails.participants.map((participant) => (
                  <li key={participant.id}>{participant.name}</li>
                ))}
              </ul>
            </div>

            <div className="message-box">
              <h3>Chat:</h3>
              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index} className="message">
                    <strong>{msg.sender}:</strong> {msg.content}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage}>
                <input
                  ref={messageInputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                />
                <button type="submit">Send</button>
              </form>
            </div>

            <div className="video-call-actions">
              {videoCallActive ? (
                <button onClick={handleStopVideoCall}>End Video Call</button>
              ) : (
                <button onClick={handleStartVideoCall}>Start Video Call</button>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RoomPage;
