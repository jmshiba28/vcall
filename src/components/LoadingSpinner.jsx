import React from "react";
import PropTypes from "prop-types";
import "../styles/global.css"; // Import global styles

const LoadingSpinner = ({ size, color, type, message, className }) => {
  const spinnerSize = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  }[size];

  const spinnerColor = {
    primary: "text-blue-600",
    secondary: "text-green-600",
    tertiary: "text-gray-600",
  }[color];

  const renderSpinner = () => {
    switch (type) {
      case "dots":
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full bg-current animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      case "bars":
        return (
          <div className="flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-6 bg-current animate-pulse`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );
      case "pulse":
        return (
          <div className="w-8 h-8 bg-current rounded-full animate-ping" />
        );
      case "circle":
      default:
        return (
          <svg
            className={`animate-spin ${spinnerSize} ${spinnerColor}`}
            viewBox="0 0 50 50"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M25 5a20 20 0 0116.97 10.5A20 20 0 0125 45V5z"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`} role="status" aria-live="polite">
      {renderSpinner()}
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  type: PropTypes.oneOf(["dots", "circle", "bars", "pulse"]),
  message: PropTypes.string,
  className: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  size: "medium",
  color: "primary",
  type: "circle",
  message: null,
  className: "",
};

export default LoadingSpinner;
