import React from 'react';
import '../../styles/Input.css'; // ✅ Correct import

const Input = ({ label, value, onChange, placeholder, error }) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input-field ${error ? 'input-error' : ''}`}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
