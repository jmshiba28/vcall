import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />

      {/* Hero Section */}
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Welcome to the Chat & Video Conference App</h1>
        <p className={styles.heroSubtitle}>Experience seamless communication with real-time chat and video calls.</p>
        <div className={styles.heroButtons}>
          <Link to="/chat" className={styles.btnPrimary}>Start Chatting</Link>
          <Link to="/video" className={styles.btnSecondary}>Start Video Call</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <div className={styles.featuresGrid}>
          {features.map(({ title, description, icon }, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.icon}>{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map(({ quote, author }, index) => (
            <div key={index} className={styles.testimonialCard}>
              <p className={styles.quote}>“{quote}”</p>
              <p className={styles.author}>- {author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.sectionTitle}>Ready to Get Started?</h2>
        <p className={styles.ctaSubtitle}>Join us today and start enjoying effortless communication.</p>
        <Link to="/signup" className={styles.btnPrimary}>Sign Up Now</Link>
      </section>

      <Footer />
    </div>
  );
};

// Features Data
const features = [
  { title: "Real-time Chat", description: "Engage in instant conversations with colleagues and friends.", icon: "💬" },
  { title: "Video Conferencing", description: "Experience high-quality video calls for meetings and discussions.", icon: "📹" },
  { title: "File Sharing", description: "Send and receive documents seamlessly during chats or calls.", icon: "📁" },
  { title: "End-to-End Encryption", description: "Your conversations are private, secure, and encrypted.", icon: "🔒" },
];

// Testimonials Data
const testimonials = [
  { quote: "This app has transformed how we collaborate as a team!", author: "User A" },
  { quote: "The video quality is top-notch, and the chat interface is intuitive.", author: "User B" },
  { quote: "File sharing is seamless, making teamwork a breeze.", author: "User C" },
];

export default HomePage;
