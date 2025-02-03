import { useEffect, useRef, useState, useCallback } from "react";

const useWebSocket = (roomId, options = {}) => {
  const {
    url = "wss://your-websocket-url",
    reconnectAttempts = 5,
    reconnectInterval = 3000,
  } = options;

  const socketRef = useRef(null);
  const reconnectCount = useRef(0);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  const connectWebSocket = useCallback(() => {
    if (!roomId) return;

    // Create a new WebSocket connection
    socketRef.current = new WebSocket(`${url}/room/${roomId}`);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      reconnectCount.current = 0; // Reset reconnection attempts
    };

    socketRef.current.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, parsedMessage]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onclose = (event) => {
      console.warn("WebSocket closed:", event.reason);
      setIsConnected(false);
      if (reconnectCount.current < reconnectAttempts) {
        reconnectCount.current += 1;
        setTimeout(connectWebSocket, reconnectInterval);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [roomId, url, reconnectAttempts, reconnectInterval]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const sendMessage = useCallback(
    (message) => {
      if (socketRef.current && isConnected) {
        socketRef.current.send(JSON.stringify({ content: message }));
      } else {
        console.warn("Cannot send message, WebSocket is not connected.");
      }
    },
    [isConnected]
  );

  return { isConnected, messages, sendMessage };
};

export default useWebSocket;
