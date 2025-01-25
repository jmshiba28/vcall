import { useEffect, useRef, useState } from "react";

// Custom hook to manage WebSocket connection and messaging
const useWebSocket = (roomid) => {
  const socketRef = useRef(null);  // Ref to hold WebSocket connection
  const [isConnected, setIsConnected] = useState(false);  // Track WebSocket connection status
  const [messages, setMessages] = useState([]);  // Store received messages

  // Establish WebSocket connection on component mount
  useEffect(() => {
    // Initialize the WebSocket connection to the specific room URL
    socketRef.current = new WebSocket(`wss://your-websocket-url/room/${roomid}`);

    // WebSocket event listeners
    socketRef.current.onopen = () => {
      setIsConnected(true);  // Set connection status to true when connected
    };

    socketRef.current.onmessage = (event) => {
      // Parse incoming messages and update state
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
    };

    socketRef.current.onclose = () => {
      setIsConnected(false);  // Update connection status when connection is closed
    };

    // Cleanup function to close WebSocket when component unmounts or roomid changes
    return () => {
      socketRef.current.close();
    };
  }, [roomid]);  // Re-run effect when roomid changes

  // Send message to WebSocket server
  const sendMessage = (message) => {
    if (socketRef.current && isConnected) {
      // Send message as a JSON string through the WebSocket
      socketRef.current.send(JSON.stringify({ content: message }));
    }
  };

  return { isConnected, messages, sendMessage };  // Return connection status, messages, and sendMessage function
};

export default useWebSocket;
