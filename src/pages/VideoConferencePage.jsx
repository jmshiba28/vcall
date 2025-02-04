import React, { useState } from 'react';
import { VideoLayout } from '../layouts/VideoLayout';
import { startVideoConference } from '../api/videoApi';
import { motion } from 'framer-motion';
import { FaVideo, FaStopCircle } from 'react-icons/fa'; // Video call icons
import { toast } from 'react-toastify'; // For notifications

const VideoConferencePage = () => {
  const [videoStarted, setVideoStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const maxRetries = 3;

  // Start video conference with retries
  const handleStartVideoConference = async () => {
    setIsLoading(true);
    setError('');
    try {
      await startConferenceWithRetry();
    } catch (err) {
      setError('An error occurred while starting the video conference.');
    } finally {
      setIsLoading(false);
    }
  };

  const startConferenceWithRetry = async () => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await startVideoConference("user123"); // Example user ID
        if (result) {
          setVideoStarted(true);
          toast.success('Video conference started successfully!', { autoClose: 3000 });
          return;
        }
      } catch (error) {
        if (attempt === maxRetries) {
          throw new Error("Failed to start video conference after multiple attempts.");
        }
      }
    }
  };

  const handleEndVideoConference = () => {
    setVideoStarted(false);
    toast.info('Video conference ended.', { autoClose: 3000 });
  };

  return (
    <VideoLayout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Video Conference Room</h2>
        {videoStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 p-6 rounded-lg shadow-md"
          >
            <p className="text-lg text-green-600 font-medium">Video conference has started!</p>
            <button
              onClick={handleEndVideoConference}
              className="mt-4 px-6 py-3 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300"
            >
              <FaStopCircle className="mr-2" /> End Video Conference
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-100 p-6 rounded-lg shadow-md"
          >
            <p className="text-lg text-gray-700 mb-4">Click below to start the video conference.</p>
            <button
              onClick={handleStartVideoConference}
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md transition ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300'
              }`}
            >
              {isLoading ? 'Starting...' : 'Start Video Conference'}
              <FaVideo className="ml-2" />
            </button>
          </motion.div>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-red-500 mt-4"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </VideoLayout>
  );
};

export default VideoConferencePage;
