import React from "react";
import PropTypes from "prop-types";

const ChatBubble = ({ message, sender, isMine }) => {
  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isMine ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <p className="text-sm font-semibold">{sender}</p>
        <p className="text-sm">{message}</p>
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
