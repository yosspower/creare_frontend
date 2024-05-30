import React, { useState, createContext } from "react";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen, handleClose }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
