import React, { useRef, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../api/products";
import "./product.css";
const ProductDetails = () => {
  // get the product id from url
  const { slug } = useParams();
  const carouselRef = useRef(null);
  const [displayImage, setDisplayImage] = useState("");
  const [product, setProduct] = useState({
    images: [],
    colors: [],
    variants: [],
  });
  const { addToCart } = useContext(CartContext);
  const dispatch = useDispatch();

  //get the single product based on id
  useEffect(() => {
    const getProduct = async () => {
      const results = await getProductBySlug(slug);
      if (results) {
        setProduct(results);
        setDisplayImage(results.images[0]);
      }
    };
    getProduct();
  }, []);


  // destructure product
  const { id, name, images, price, shortDescription } = product;
  return (
    <section className=" md:pt-32 pb-[400px] md:pb-12 lg:py-32 flex ">
      <div className="container flex justify-center">
        {/* image and text wrapper */}
        <div className=" flex  justify-center  lg:flex-row items-center gap-10 ">
          {/* images */}
          <div className="flex gap-8 items-center">
            <div className="grid  max-w-sm cursor-pointer  justify-center gap-3 overflow-y-auto pr-3    " style={{ height:"500px" }}>
              {images.map((image, index) => (
                <div
                  className="flex justify-center relative p-3 "
                  key={index}
                  onClick={() => setDisplayImage(image)}
                >
                  {displayImage === image ? (
                    <div className="bg-black absolute inset-0 rounded-lg   opacity-50"></div>
                  ) : (
                    ""
                  )}
                  <img src={image} className={`h-40 rounded-lg `} alt="..." />
                </div>
              ))}
            </div>
            {/* displayed Image */}
            <div className="max-w-lg">
              <img
                src={displayImage}
                className=" rounded-md"
                alt="..."
                style={{ width: "350px",maxHeight:"500px" }}
              />
            </div>
          </div>
          {/* text */}
          <div className="grid  gap-3 text-center w-1/2  lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] content-center  lg:mx-0">
              {name}
            </h1>
            <div className="text-2xl text-red-500 font-medium mb-6">
              $ {price}.00
            </div>

            <p className="mb-8">{shortDescription}</p>

            <p
                className="text-lg text-gray-500 dark:text-gray-400"
                style={{ fontWeight: "bold" }}
              >
                COLOR
                <div
                  className="flex gap-3 my-4 ml-10  p-1 px-4 rounded-md  "
                  style={{ width: "fit-content" }}
                >
                  {product.colors.map((color, index) => (
                    <div
                      className="w-8 h-8 rounded-full border-2  border-cool-gray-400  "
                      style={{ backgroundColor: color }}
                      key={index}
                    ></div>
                  ))}
                </div>
              </p>
              <hr />
              {/* variants  */}

              {product.variants &&
                product.variants?.map((variant, key) => (
                  <>
                    <p className="mt-6" key={key}>
                      <div
                        className=" text-lg uppercase text-gray-500 "
                        style={{ fontWeight: "bold" }}
                      >
                        {variant.name}
                      </div>

                      <div className="flex gap-3 my-4 ml-10">
                        {variant.values.map((value, index) => (
                          <span
                            id="badge-dismiss-default"
                            key={index}
                            className=" inline-flex items-center px-2 py-2 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </p>
                    <hr />
                  </>
                ))}
            <button
              onClick={() => addToCart(product, product.id)}
              className="bg-primary py-4 px-8 text-white"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
