import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/global.css"; // Adjust the path to the global CSS file
import Loader from "../LoadingSpinner/LoadingSpinner"; // Adjust the path to the Loader component

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