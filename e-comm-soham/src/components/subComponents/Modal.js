import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../css/modal.css"; 

function Modal({ show, onClose, children, opacity, position, popupClass }) {
  let status = show ? "open" : "close";

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50  transition-opacity ${
        show ? `opacity-${opacity}` : "opacity-0 pointer-events-none"
      }`}
    >
      <div className={`popup ${popupClass} ${status} ${position}-0`}>
        <button onClick={onClose} className="close-button">
          <FontAwesomeIcon icon={faTimes} className="text-3xl" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
