// src/components/LoadingSpinner.jsx
import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size, color, type, message, className }) => {
  const spinnerSizeClass = size === 'small' ? 'w-6 h-6' : size === 'large' ? 'w-16 h-16' : 'w-8 h-8';
  const spinnerColorClass = color === 'primary' ? 'text-blue-600' : color === 'secondary' ? 'text-green-600' : 'text-gray-600';
  const spinnerTypeClass =
    type === 'dots'
      ? 'dot-spinner'
      : type === 'circle'
      ? 'animate-spin border-4 border-solid rounded-full border-t-transparent'
      : 'circle';

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Loading Spinner */}
      <div
        className={`${spinnerSizeClass} ${spinnerColorClass} ${spinnerTypeClass}`}
        role="status"
      ></div>
      {/* Optional message */}
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

// Spinner Type CSS for Dot Spinner
const dotSpinnerStyle = `
@keyframes dot-spin {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
.dot-spinner {
  display: flex;
  gap: 4px;
  justify-content: space-evenly;
}
.dot-spinner div {
  width: 10px;
  height: 10px;
  background-color: currentColor;
  border-radius: 50%;
  animation: dot-spin 1s infinite ease-in-out;
}
.dot-spinner div:nth-child(1) {
  animation-delay: 0s;
}
.dot-spinner div:nth-child(2) {
  animation-delay: 0.2s;
}
.dot-spinner div:nth-child(3) {
  animation-delay: 0.4s;
}
`;

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(dotSpinnerStyle, styleSheet.cssRules.length);

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  type: PropTypes.oneOf(['dots', 'circle']),
  message: PropTypes.string,
  className: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  size: 'medium',
  color: 'primary',
  type: 'circle',
  message: null,
  className: '',
};

export default LoadingSpinner;
