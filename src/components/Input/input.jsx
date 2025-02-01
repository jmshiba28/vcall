import React, { useState } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import "../../styles/Input.css";

const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  isRequired = false,
  icon: Icon,
  errorMessage = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className={`input-container ${isFocused ? "input-focused" : ""} ${errorMessage ? "input-error" : ""} ${className}`}>
      {Icon && <Icon className="input-icon" />}
      <input
        aria-label={placeholder}
        aria-required={isRequired}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
        required={isRequired}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {type === "password" && (
        <button type="button" onClick={togglePassword} className="toggle-password">
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
      {errorMessage && (
        <div className="input-error-message">
          <AlertCircle size={16} /> <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  icon: PropTypes.elementType,
  errorMessage: PropTypes.string,
};

export default Input;
