// components/ui/index.js
import React from "react";

// Card components
export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);
export const CardDescription = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);
export const CardHeader = ({ children }) => (
  <div className="p-4">{children}</div>
);
export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
export const CardFooter = ({ children }) => (
  <div className="p-4">{children}</div>
);
export const Card = ({ children }) => (
  <div className="bg-white shadow-lg rounded-lg">{children}</div>
);

// Form components
export const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block font-semibold">
    {children}
  </label>
);
export const Input = ({ id, placeholder, type }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);
export const Textarea = ({ id, placeholder, className }) => (
  <textarea
    id={id}
    placeholder={placeholder}
    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);
export const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {children}
  </button>
);
