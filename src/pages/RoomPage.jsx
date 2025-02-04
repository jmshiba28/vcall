import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomDetails, joinRoom, leaveRoom, startVideoCall, stopVideoCall } from '../api/roomApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import useWebSocket from '../hooks/useWebSocket';
import { FaVideo, FaPhoneAlt, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'; // Icons for buttons
import styles from '../styles/RoomPage.module.css'; // External Styles

const RoomPage = () => {
  const { roomid } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [videoCallActive, setVideoCallActive] = useState(false);
  const { messages: socketMessages, sendMessage } = useWebSocket(roomid);
  const messageInputRef = useRef(null);

  // Fetch room details
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

  // Join room
  const handleJoinRoom = async () => {
    try {
      await joinRoom(roomid);
      setIsJoined(true);
    } catch (err) {
      setError('Failed to join the room.');
    }
  };

  // Leave room
  const handleLeaveRoom = async () => {
    try {
      await leaveRoom(roomid);
      setIsJoined(false);
    } catch (err) {
      setError('Failed to leave the room.');
    }
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        sendMessage(message);
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

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (socketMessages && socketMessages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...socketMessages]);
    }
  }, [socketMessages]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.roomPage}>
      <Navbar />
      <div className={styles.container}>
        {error && <p className={styles.error}>{error}</p>}
        {roomDetails && (
          <>
            <h1 className={styles.roomTitle}>{roomDetails.name}</h1>
            <p className={styles.roomDescription}>{roomDetails.description}</p>

            <div className={styles.actions}>
              {isJoined ? (
                <button className={`${styles.leaveButton} ${styles.button}`} onClick={handleLeaveRoom}>
                  <FaSignOutAlt /> Leave Room
                </button>
              ) : (
                <button className={`${styles.joinButton} ${styles.button}`} onClick={handleJoinRoom}>
                  <FaSignInAlt /> Join Room
                </button>
              )}
            </div>

            <div className={styles.participants}>
              <h3>Participants:</h3>
              <ul>
                {roomDetails.participants.map((participant) => (
                  <li key={participant.id}>{participant.name}</li>
                ))}
              </ul>
            </div>

            <div className={styles.chatBox}>
              <h3>Chat:</h3>
              <div className={styles.messages}>
                {messages.map((msg, index) => (
                  <div key={index} className={styles.message}>
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
                  className={styles.messageInput}
                />
                <button type="submit" className={styles.sendButton}>
                  Send
                </button>
              </form>
            </div>

            <div className={styles.videoCallActions}>
              {videoCallActive ? (
                <button className={`${styles.endCallButton} ${styles.button}`} onClick={handleStopVideoCall}>
                  <FaPhoneAlt /> End Video Call
                </button>
              ) : (
                <button className={`${styles.startCallButton} ${styles.button}`} onClick={handleStartVideoCall}>
                  <FaVideo /> Start Video Call
                </button>
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
