import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BsPlus, BsEyeFill } from "react-icons/bs";

import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // destructure product
  const { images, name, price, slug, shortDescription, description } = product;
  const excerpt = shortDescription ?? description ?? "";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link to={`/shop/product/${slug}`} className="block">
        <div className="relative h-[280px] overflow-hidden bg-gray-50">
          {/* images */}
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src={images?.[0]}
            alt={name}
          />
          {/* subtle overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">
          {name}
        </div>
        <Link to={`/shop/product/${slug}`}>
          <h2 className="font-semibold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#00ADB5] transition-colors">
            {excerpt.slice(0, 30)}...
          </h2>
        </Link>

        <h2 className="font-bold text-lg text-[#00ADB5]">${price}</h2>
      </div>
    </div>
  );
};

export default Product;
