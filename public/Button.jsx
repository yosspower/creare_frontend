import React from "react";

const Button = ({ className, type, children }) => {
  return (
    <button
      className={`py-2 px-4 rounded-lg ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
