import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Chat and Video Conference App</h1>
      <p>This is a platform for seamless chat and video conferencing.</p>
      <div className="home-buttons">
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
        <Link to="/chat">
          <button className="button">Go to Chat</button>
        </Link>
        <Link to="/video-conference">
          <button className="button">Join Video Conference</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
