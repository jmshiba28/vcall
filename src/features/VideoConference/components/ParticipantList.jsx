import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/videoConference.module.css";

const ParticipantList = ({ participants }) => {
  return (
    <div className={styles.participantList}>
      {participants.map((participant, index) => (
        <div key={index} className={styles.participantItem}>
          {participant.name}
        </div>
      ))}
    </div>
  );
};

ParticipantList.propTypes = {
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ParticipantList;
