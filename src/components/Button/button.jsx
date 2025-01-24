import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, label, type = "button", className }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${className}`}
    >
      {label}
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
