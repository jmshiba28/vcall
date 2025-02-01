import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import "../../styles/Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  // Handle key events for closing and trapping focus
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Tab") {
      const focusableElements = modalRef.current?.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      modalRef.current?.focus();
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-labelledby="modal-title"
        ref={modalRef}
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Modal;
