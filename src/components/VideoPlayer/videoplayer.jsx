import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import '../../styles/variables.css';

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
      className={`video-player ${className}`}
    ></video>
  );
};

VideoPlayer.propTypes = {
  stream: PropTypes.object,
  isMuted: PropTypes.bool,
  className: PropTypes.string,
};

export default VideoPlayer;