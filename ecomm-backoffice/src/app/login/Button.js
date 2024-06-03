import React from "react";

function Button({ type, value, onClickFunction, className, color, bgColor }) {
  return (
    <button
      type={type}
      onClick={onClickFunction}
      className={`rounded-full  uppercase text-sm font-semibold px-4 py-2 bg-${bgColor} text-${color} ${className} hover:bg-white hover:text-blue-900 hover:border-blue-900 border-2 border-${color}-500 border-solid`}
    >
      {value}
    </button>
  );
}

export default Button;
