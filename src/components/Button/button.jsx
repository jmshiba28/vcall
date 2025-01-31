import React from "react";
import PropTypes from "prop-types";
import '../../styles/variables.css';

const Button = ({ onClick, label, type = "button", className }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`btn ${className}`}
    >
      {label}
    <span className="icon">{/* Add icon here if needed */}</span>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;