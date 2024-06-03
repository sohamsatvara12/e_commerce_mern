import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Input({ type, placeholder, icon, name, value, onChange, readOnly }) {
  return (
    <div className="input-field flex gap-5 items-center relative w-full mb-5 max-sm:gap-2">
      <FontAwesomeIcon icon={icon} className="text-blue-900 max-sm:text-2xl" />
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full"
      />
    </div>
  );
}

export default Input;
