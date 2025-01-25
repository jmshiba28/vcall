import React from "react";
import PropTypes from "prop-types";
import '../../styles/variables.css';

const ChatBubble = ({ message, sender, isMine }) => {
  return (
    <div className={`chat-bubble ${isMine ? "mine" : "theirs"}`}>
      <div className="bubble-content">
        <p className="sender">{sender}</p>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
};

export default ChatBubble;