import React from "react";

const Input = ({ className, placeholder, type }) => {
  return (
    <input
      className={`py-2 px-4 rounded-lg ${className}`}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;