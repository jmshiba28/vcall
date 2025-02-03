import { useState, useEffect, useCallback, useRef } from "react";

const useMediaStream = (initialConstraints) => {
  const [mediaStream, setMediaStream] = useState(null);
  const [error, setError] = useState(null);
  const [constraints, setConstraints] = useState(initialConstraints);
  const streamRef = useRef(null);

  const getMediaStream = useCallback(async (newConstraints) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia(newConstraints);
      setMediaStream(stream);
      streamRef.current = stream;
      setError(null);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      setError(err);
      setMediaStream(null);
    }
  }, []);

  useEffect(() => {
    if (constraints) {
      getMediaStream(constraints);
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [constraints, getMediaStream]);

  return { mediaStream, error, setConstraints };
};

export default useMediaStream;
