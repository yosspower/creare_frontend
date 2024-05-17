import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link, useLocation } from "react-router-dom";
import Logo from "../img/logo.svg";
import { BsBag } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { Dropdown, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CiLogout } from "react-icons/ci";
import { RiMenuFold3Fill } from "react-icons/ri";
const handleMenuClick = (e) => {
  message.info("Click on menu item. ");
  console.log("click", e);
};

const items = [
  {
    label:  <Link to="/customer/account">Account</Link>,
    
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Log Out",
    key: "2",
    icon: <CiLogout />,
    danger: true,
    // disabled: true,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const Header = () => {
  // Header state
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);


  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-[#F2F2F2] py-6 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container  mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link to={"/"}>
          <div className="w-[40px]">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        {/* pages */}
        <div
         
          className=" hidden lg:flex gap-10"
        >
  <Link className={`font-semibold font-primary text-xl ${location.pathname === "/" ? "text-[#00ADB5]" : "text-[#000]"}`} to={"/"}>

  Home
  </Link>
  <Link className={`font-bold font-primary  text-xl ${location.pathname.includes("/shop") ? "text-[#00ADB5]" : "text-[#000]"}`} to={"/shop"}>
  Shop
  </Link> 
  <Link className={`font-semibold font-primary text-xl ${location.pathname === "/categories" ? "text-[#00ADB5]" : "text-[#000]"}`} to={"/categories"}>
            Categories
          </Link>
   <Link className={`font-semibold font-primary text-xl ${location.pathname === "/contact-us" ? "text-[#00ADB5]" : "text-[#000]"}`} to={"contact-us"}>
  Contact
  </Link>
  <Link className={`font-semibold font-primary text-xl ${location.pathname === "/about" ? "text-[#00ADB5]" : "text-[#000]"}`} to={"/about"}>
  About us
  </Link>
        </div>

      {/* profile part  */}
        <div className="flex gap-5">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
        <Dropdown menu={menuProps} className="">

              <div
          className="cursor-pointer flex relative"
        >
          <IoPersonOutline  className="text-2xl" />
        
     
        </div>
    </Dropdown>
    <div className=" cursor-pointer ">
    <RiMenuFold3Fill className="visible lg:hidden" size={32} />
    </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
