import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/chat.module.css";

const MessageList = ({ messages }) => {
  return (
    <div className={styles.messageList}>
      {messages.map((message, index) => (
        <div key={index} className={styles.messageItem}>
          <p className={styles.sender}>{message.sender}</p>
          <p className={styles.text}>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MessageList;
