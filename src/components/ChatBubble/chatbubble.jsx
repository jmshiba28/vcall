import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Check, CheckCheck } from "lucide-react";
import "../../styles/ChatBubble.css";

const ChatBubble = ({ message, sender, isMine, timestamp, status = "sent" }) => {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const timeAgo = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - timeAgo) / 1000);

    if (diff < 60) setFormattedTime("just now");
    else if (diff < 3600) setFormattedTime(`${Math.floor(diff / 60)} min ago`);
    else setFormattedTime(timeAgo.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, [timestamp]);

  return (
    <div className={`chat-bubble-container ${isMine ? "mine" : "theirs"}`}>
      <div className="chat-bubble">
        {!isMine && <p className="sender">{sender}</p>}
        <p className="message">{message}</p>
        <div className="bubble-footer">
          <span className="timestamp">{formattedTime}</span>
          {isMine && (
            <span className={`message-status ${status}`}>
              {status === "sent" && <Check size={14} />}
              {status === "delivered" && <CheckCheck size={14} />}
              {status === "read" && <CheckCheck size={14} style={{ color: "#4CAF50" }} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

ChatBubble.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
  timestamp: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["sent", "delivered", "read"]),
};

export default ChatBubble;
