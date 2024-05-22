import React from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
export default function ProductCard({ product }) {
  const {
    id,
    name,
    colors,
    slug,
    images,
    fullDescription,
    price,
    shortDescription,
  } = product;
  return (
    <>
      <div className="  w-full flex items-center justify-center bg-gray-200 ">
        {/* product card */}
        <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div>
            <Link to={`/shop/product/${slug}`}>
              <img
                className="object-cover h-[350px] w-full  group-hover:scale-110 transition duration-300"
                src={images[0]}
                alt="Converse sneakers"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-1 mt-4 px-4">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <span className="font-normal text-gray-600 ">
              {shortDescription.substring(0, 30)}...
            </span>
            <span className="font-semibold text-gray-800 ">$ {price}.00</span>
          </div>

          <div className="flex gap-4 mt-4 px-4">
            <span className="sr-only">Colors available</span>
            {colors.map((color, index) => (
              <div
                className="p-1 border border-gray-200 rounded-full cursor-pointer "
                key={index}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>

          <div className="mt-4 p-4 border-t border-gray-200 ">
            <Link
              className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 "
              to={`/shop/product/${slug}`}
            >
              <span className="text-base">Shop</span>

              <span className=" p-3 rounded-2xl hover:bg-gray-800 text-cyan-500 ">
                <TiShoppingCart />
              </span>
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
