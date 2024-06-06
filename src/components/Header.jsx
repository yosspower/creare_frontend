import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../img/CREARE.png";
import { BsBag } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { Avatar, Dropdown, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { MenuContext } from "../contexts/MenuContext";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Toolkit/authSlice";
import { Button, Modal } from "antd";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const profileInfo = useSelector((state) => state.auth.user);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { itemAmount } = useContext(CartContext);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    dispatch(logOut());
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenuClick = (e) => {
    // message.info(`Clicked on menu item ${e.key}`);
    // console.log("click", e);

    if (e.key === "1") {
      navigate("/cr/account");
    } else if (e.key === "2") {
      showModal();
    }
  };

  const items = [
    {
      label: "Account",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Log Out",
      key: "2",
      icon: <CiLogout />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-[#F2F2F2] py-6 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container md:mx-auto flex items-center justify-between h-full">
        <div
          className="cursor-pointer visible lg:hidden"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <CiMenuBurger className="" size={28} />
        </div>

        <Link to="/">
          <div className="w-[150px] lg:w-[200px] ">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        <div className="hidden lg:flex gap-10">
          <Link
            className={`font-bold text-xl ${
              location.pathname === "/" ? "text-[#00ADB5]" : "text-[#1F2937]"
            }`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`font-bold text-xl ${
              location.pathname.includes("/shop")
                ? "text-[#00ADB5]"
                : "text-[#1F2937]"
            }`}
            to="/shop"
          >
            Shop
          </Link>
          <Link
            className={`font-bold text-xl ${
              location.pathname === "/categories"
                ? "text-[#00ADB5]"
                : "text-[#1F2937]"
            }`}
            to="/categories"
          >
            Categories
          </Link>
          <Link
            className={`font-bold text-xl ${
              location.pathname === "/contact-us"
                ? "text-[#00ADB5]"
                : "text-[#1F2937]"
            }`}
            to="/contact-us"
          >
            Contact
          </Link>
          <Link
            className={`font-bold text-xl ${
              location.pathname === "/about"
                ? "text-[#00ADB5]"
                : "text-[#1F2937]"
            }`}
            to="/about"
          >
            About us
          </Link>
        </div>

        <div className="flex gap-5  items-center">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative h-fit "
          >
            <BsBag className="text-2xl  " />
            <div className="bg-red-500 absolute -right-2 -bottom-1 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
          {isAuth ? (
            <Dropdown menu={menuProps}>
              <div className="cursor-pointer flex relative">
                <Avatar size={32} src={profileInfo.avatar} />
              </div>
            </Dropdown>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-gray-800 text-white rounded-md text-pretty text-center"
            >
              Login
            </Link>
          )}

          <Modal
            open={open}
            title="Log out"
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              style: {
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
              },
            }}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn
                  style={{
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "white",
                  }}
                />
              </>
            )}
          >
            <p>are you sure you want to logout from your account ?!</p>
          </Modal>
        </div>
      </div>
    </header>
  );
};

export default Header;
