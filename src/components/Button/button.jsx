import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/Button.css";
import Loader from "../Loader"; // Adjust the path as necessary

const Button = ({
  onClick,
  label,
  type = "button",
  className = "",
  icon: Icon,
  isLoading = false,
  disabled = false,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (e) => {
    if (disabled || isLoading) return;
    setIsClicked(true);
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      className={`btn ${className} ${isLoading ? "btn-loading" : ""} ${disabled ? "btn-disabled" : ""}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading ? "true" : "false"}
    >
      {isLoading ? (
        <Loader className="loader" size={18} />
      ) : (
        <>
          <div className="loader" style={{ width: 18, height: 18 }}></div>
          {Icon && <Icon className="btn-icon" />}
          {label}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.elementType,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
