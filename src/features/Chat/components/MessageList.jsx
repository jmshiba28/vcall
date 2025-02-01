import React, { useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/MessageList.module.css";
import ReactMarkdown from "react-markdown";
import Emoji from "react-emoji-render";

const MessageList = ({ messages, currentUser, theme = "light" }) => {
  const messageEndRef = useRef(null);
  const lastMessageRef = useRef(null);

  // Auto-scroll only if user is at the bottom
  useEffect(() => {
    if (
      messageEndRef.current &&
      lastMessageRef.current &&
      Math.abs(messageEndRef.current.scrollHeight - messageEndRef.current.scrollTop - messageEndRef.current.clientHeight) < 50
    ) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Memoized messages for performance optimization
  const renderedMessages = useMemo(() => {
    return messages.map((message, index) => {
      const isSent = message.sender === currentUser;
      const statusIcon = message.status === "read" ? "✅" : message.status === "delivered" ? "✔️" : "⏳";

      return (
        <motion.div
          key={message.id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`${styles.messageItem} ${isSent ? styles.sent : styles.received} ${styles[theme]}`}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          {!isSent && <img src={message.avatar} alt="Avatar" className={styles.avatar} />}
          <div className={styles.messageContent}>
            <p className={styles.sender}>{message.sender}</p>
            <ReactMarkdown className={styles.text}>
              <Emoji text={message.text} />
            </ReactMarkdown>
            <span className={styles.timestamp}>
              {message.timestamp} {isSent && <span className={styles.status}>{statusIcon}</span>}
            </span>
          </div>
        </motion.div>
      );
    });
  }, [messages, currentUser, theme]);

  return (
    <div className={`${styles.messageList} ${styles[theme]}`} ref={messageEndRef}>
      <AnimatePresence>{renderedMessages}</AnimatePresence>
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      status: PropTypes.oneOf(["sent", "delivered", "read"]),
    })
  ).isRequired,
  currentUser: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]),
};

export default MessageList;
