import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />
      <header className="hero-section">
        <h1>Welcome to the Chat and Video Conference App</h1>
        <p>This is a platform for seamless chat and video conferencing.</p>
        <Link to="/chat" className="btn-primary">Start Chatting</Link>
        <Link to="/video" className="btn-secondary">Start Video Call</Link>
      </header>
      <section className="features-section">
        <h2>Features</h2>
        <div className="features">
          <div className="feature">
            <h3>Real-time Chat</h3>
            <p>Engage in real-time conversations with your friends and colleagues.</p>
          </div>
          <div className="feature">
            <h3>Video Conferencing</h3>
            <p>Host and join video calls with high-quality video and audio.</p>
          </div>
          <div className="feature">
            <h3>File Sharing</h3>
            <p>Share files and documents seamlessly during your chats and calls.</p>
          </div>
          <div className="feature">
            <h3>Secure</h3>
            <p>All your communications are encrypted and secure.</p>
          </div>
        </div>
      </section>
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"This app has transformed the way we communicate in our team. Highly recommended!"</p>
            <p>- User A</p>
          </div>
          <div className="testimonial">
            <p>"The video quality is amazing and the chat features are very intuitive."</p>
            <p>- User B</p>
          </div>
          <div className="testimonial">
            <p>"I love the file sharing feature. It makes collaboration so much easier."</p>
            <p>- User C</p>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join us today and start enjoying seamless communication.</p>
        <Link to="/signup" className="btn-primary">Sign Up Now</Link>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;