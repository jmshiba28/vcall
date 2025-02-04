import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/ChatLayout.module.css";

const ChatLayout = ({ sidebar, chatWindow }) => {
  return (
    <div className={styles.chatLayout}>
      {/* Sidebar for contacts or channels */}
      <aside className={styles.sidebar}>{sidebar}</aside>

      {/* Main chat window */}
      <section className={styles.chatWindow}>{chatWindow}</section>
    </div>
  );
};

// PropTypes for type checking
ChatLayout.propTypes = {
  sidebar: PropTypes.node.isRequired,
  chatWindow: PropTypes.node.isRequired,
};

export default ChatLayout;
