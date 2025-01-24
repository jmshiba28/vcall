import React, { useState } from 'react';
import { VideoLayout } from '../layouts/VideoLayout';
import { startVideoConference } from '../api/videoApi';

const VideoConferencePage = () => {
  const [videoStarted, setVideoStarted] = useState(false);
  const [error, setError] = useState('');

  const handleStartVideoConference = async () => {
    try {
      const result = await startVideoConference("user123"); // Example user ID
      if (result) {
        setVideoStarted(true);
      } else {
        setError("Failed to start the video conference.");
      }
    } catch (error) {
      setError("An error occurred while starting the video conference.");
    }
  };

  return (
    <VideoLayout>
      <h2>Video Conference Room</h2>
      {videoStarted ? (
        <div>
          <p>Video conference has started!</p>
          {/* Render video conference UI */}
        </div>
      ) : (
        <div>
          <p>Click below to start the video conference.</p>
          <button onClick={handleStartVideoConference}>Start Video Conference</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </VideoLayout>
  );
};

export default VideoConferencePage;
