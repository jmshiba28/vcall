import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/user.module.css";

const ProfileCard = ({ user }) => {
  return (
    <div className={styles.profileCard}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
