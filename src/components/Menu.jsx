import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

import { MenuContext } from "../contexts/MenuContext";

const Menu = () => {
  const { isMenuOpen, handleClose } = useContext(MenuContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${
        isMenuOpen && windowWidth <= 1024 ? "right-0" : "-right-full"
      } "w-full bg-[#1F2937] fixed top-0 h-full shadow-2xl w-[300px] transition-all duration-500 z-20 px-4 lg:px-[35px]"`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase flex gap-3 text-white text-2xl font-bold ">
          <CiMenuFries className="mt-1" />
          Menu
        </div>
        <div
          onClick={handleClose}
          className=" w-8 h-8 flex justify-center items-center"
        >
          <IoCloseSharp className="text-3xl text-white cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col p-3 pt-7 gap-y-5 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden ">
        <Link to="/home" className="text-white text-lg font-bold ">
          Home
        </Link>
        <Link to="/shop" className="text-white text-lg font-bold ">
          Shop
        </Link>
        <Link to="/contact-us" className="text-white text-lg font-bold ">
          Contact
        </Link>
        <Link to="/about" className="text-white text-lg font-bold ">
          About
        </Link>
        <Link to="/categories" className="text-white text-lg font-bold ">
          Categories
        </Link>
      </div>
    </div>
  );
};

export default Menu;
