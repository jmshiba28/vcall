import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import styles from "../styles/MainLayout.module.css";

const MainLayout = ({ header, footer }) => {
  return (
    <div className={styles.mainLayout}>
      {/* Header Section */}
      <header className={styles.header}>{header}</header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer className={styles.footer}>{footer}</footer>
    </div>
  );
};

// PropTypes for validation
MainLayout.propTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
};

export default MainLayout;
