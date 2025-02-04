import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/VideoLayout.module.css";

const VideoLayout = ({ videoGrid, controls }) => {
  return (
    <div className={styles.videoLayout}>
      {/* Header / Navbar */}
      <nav className={styles.navbar}>
        <h3>Video Conference</h3>
      </nav>

      {/* Video Grid Section */}
      <section className={styles.videoGrid}>{videoGrid}</section>

      {/* Video Controls */}
      <div className={styles.videoControls}>{controls}</div>
    </div>
  );
};

// PropTypes for validation
VideoLayout.propTypes = {
  videoGrid: PropTypes.node.isRequired,
  controls: PropTypes.node.isRequired,
};

export default VideoLayout;
