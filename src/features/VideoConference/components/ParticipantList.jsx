import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/videoConference.module.css";

const ParticipantList = ({ participants }) => {
  return (
    <div className={styles.participantList}>
      <h3 className={styles.title}>Participants ({participants.length})</h3>
      <AnimatePresence>
        {participants.map((participant) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={styles.participantItem}
          >
            <img
              src={participant.avatar || "/default-avatar.png"}
              alt={participant.name}
              className={styles.avatar}
            />
            <div className={styles.details}>
              <p className={styles.name}>{participant.name}</p>
              <span className={`${styles.status} ${styles[participant.status]}`}>
                {participant.status}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

ParticipantList.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      status: PropTypes.oneOf(["online", "offline", "speaking"]).isRequired,
    })
  ).isRequired,
};

export default ParticipantList;
