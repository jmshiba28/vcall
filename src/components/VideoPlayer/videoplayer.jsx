import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Maximize, Minimize, Play, Pause, VolumeX, Volume2, ExternalLink } from "lucide-react";
import "../../styles/VideoPlayer.css";

const VideoPlayer = ({ stream, isMuted, className }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(isMuted);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadeddata = () => setLoading(false);
    }
  }, [stream]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.parentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (videoRef.current && document.pictureInPictureEnabled) {
      videoRef.current.requestPictureInPicture();
    }
  };

  return (
    <div className={`video-container ${className}`}>
      {loading && <div className="loading-spinner">Loading...</div>}

      {stream ? (
        <video ref={videoRef} autoPlay muted={muted} className="video-player"></video>
      ) : (
        <div className="video-placeholder">No video stream available</div>
      )}

      {/* Controls */}
      <div className="video-controls">
        <button onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button onClick={toggleMute} title={muted ? "Unmute" : "Mute"}>
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <button onClick={togglePictureInPicture} title="Picture-in-Picture">
          <ExternalLink size={20} />
        </button>

        <button onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  stream: PropTypes.object,
  isMuted: PropTypes.bool,
  className: PropTypes.string,
};

export default VideoPlayer;
