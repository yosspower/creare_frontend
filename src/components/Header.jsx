import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link  , useLocation} from "react-router-dom";
import Logo from "../img/logo.svg";
import { BsBag } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import {Dropdown, message} from 'antd';
import {UserOutlined } from '@ant-design/icons';
import { CiLogout } from "react-icons/ci";

const handleMenuClick = (e) => {
  message.info('Click on menu item. ');
  console.log('click', e);
};

const items= [
  {
    label: 'Account',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Log Out',
    key: '2',
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
  // header state
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
        isActive ? "bg-white py-6 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[40px]">
            <img src={Logo} alt="" />
          </div>
        </Link>

        {/* pages */}
        <div
         
          className="flex gap-10"
        >
  <Link className={`font-bold text-xl ${location.pathname === "/" ? "text-[#00ADB5]" : "text-[#000]"}`} to={"/"}>

  Home
  </Link>
  <Link className={`font-bold text-xl ${location.pathname.includes("/shop") ? "text-[#00ADB5]" : "text-[#000]"}`} to={"/shop"}>
  Shop
  </Link> 
   <Link className={`font-bold text-xl ${location.pathname === "/contact-us" ? "text-[#00ADB5]" : "text-[#000]"}`} to={"contact-us"}>
  Contact
  </Link>
  <Link className="font-bold  text-xl" to={"/"}>
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
        </div>
    
      </div>
    </header>
  );
};

export default Header;
