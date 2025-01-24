import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({ stream, isMuted, className }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted={isMuted}
      className={`rounded-lg ${className}`}
    ></video>
  );
};

VideoPlayer.propTypes = {
  stream: PropTypes.object,
  isMuted: PropTypes.bool,
  className: PropTypes.string,
};

export default VideoPlayer;
