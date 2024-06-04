import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "./CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import Modal from "./Modal"; // Import the Modal component

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleCheckoutClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Add your payment logic here
    console.log("Payment submitted via", paymentMethod);
    setShowPaymentForm(false);
  };

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 mt-4">
        <div className="flex w-full justify-between items-center">
          {/* total */}
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span> ${" "}
            {parseFloat(total).toFixed(2)}
          </div>
          {/* clear cart icon */}
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <Link
          to={"/"}
          className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium"
        >
          View Cart
        </Link>
        <button
          onClick={handleCheckoutClick}
          className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </button>
      </div>

      {/* Payment Modal */}
      <Modal
        isVisible={showPaymentForm}
        onClose={() => setShowPaymentForm(false)}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Choose Payment Method
        </h2>
        <form onSubmit={handlePaymentSubmit} className="mt-4 space-y-6">
          <div className="flex justify-around">
            <label className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <div
                className={`flex flex-col items-center border-4 p-6 rounded-lg ${paymentMethod === "card" ? "border-blue-500" : "border-gray-300"}`}
              >
                <img
                  src="/images/visa.png"
                  alt="Card"
                  className="w-20 h-20 mb-2"
                />
                <span className="text-lg font-medium">Card</span>
              </div>
            </label>
            <label className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <div
                className={`flex flex-col items-center border-4 p-6 rounded-lg ${paymentMethod === "paypal" ? "border-blue-500" : "border-gray-300"}`}
              >
                <img
                  src="/images/paypal.png"
                  alt="PayPal"
                  className="w-20 h-20 mb-2"
                />
                <span className="text-lg font-medium">PayPal</span>
              </div>
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                PayPal Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#454545] text-[#FEFBF6] py-3 rounded-lg shadow-lg hover:bg-#51829B transition-colors"
          >
            Submit Payment
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Sidebar;
