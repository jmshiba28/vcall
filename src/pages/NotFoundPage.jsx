import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa'; // For Home icon
import styles from '../styles/NotFoundPage.module.css'; // External Styles

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={styles.content}
      >
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Oops! Page Not Found</h2>
        <p className={styles.message}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className={styles.goHomeButton}
        >
          <FaHome className="mr-2" />
          Go Back to Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className={styles.imageContainer}
      >
        <img
          src="https://via.placeholder.com/600x400" // Replace with custom 404 image URL
          alt="Not Found Illustration"
          className={styles.image}
        />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
