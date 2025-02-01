import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styles from "../styles/user.module.css";

const ProfileCard = ({ user, onEdit, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
    if (onEdit) onEdit();
  };

  // Handle logout button click
  const handleLogoutClick = () => {
    if (onLogout) onLogout();
  };

  // Display default avatar if none exists
  const userAvatar = user.avatar || "https://via.placeholder.com/150";
  
  return (
    <motion.div
      className={`${styles.profileCard} ${user.isOnline ? styles.online : styles.offline}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.avatarContainer}>
        <img src={userAvatar} alt={user.name} className={styles.avatar} />
      </div>
      <div className={styles.details}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p className={styles.status}>{user.isOnline ? "Online" : "Offline"}</p>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={handleEditClick}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className={styles.logoutButton} onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </motion.div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    isOnline: PropTypes.bool,
  }).isRequired,
  onEdit: PropTypes.func,
  onLogout: PropTypes.func,
};

export default ProfileCard;
