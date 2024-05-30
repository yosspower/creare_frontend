import React, { useRef, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../api/products";
import "./product.css";
import { SidebarContext } from "../../contexts/SidebarContext";
import Reviews from "../../components/ProductReviews";
import  ProductDetailsPlaceholder  from "../../components/placeholders/ProductDetailsPlaceholder";



const ProductDetails = () => {
  // get the product id from url
  const { setIsOpen } = useContext(SidebarContext);

  const { slug } = useParams();
  const [display, setDisplay] = useState("details");

  const [displayImage, setDisplayImage] = useState("");
  const [product, setProduct] = useState({
    images: [],
    colors: [],
    variants: [],
  });

  const [chosenProduct, setChosenProduct] = useState({});

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
  const handleAddToCart = (product, id) => {
    setIsOpen(true);
    addToCart(product, id);
  };

  // destructure product
  const { name, images, fullDescription, price, shortDescription, reviews } =
    product;

  return displayImage ? (
    <>
      <section className=" md:pt-32 mt-32 lg:mt-10 pb-[400px] md:pb-12 lg:py-32 flex justify-center ">
        <div className="container flex justify-center">
          {/* image and text wrapper */}
          <div className="grid lg:flex  justify-center   items-center gap-10  ">
            {/* images */}
            <div className="flex gap-8 items-center">
              <div
                className="grid  max-w-sm cursor-pointer  justify-center gap-3 overflow-y-auto pr-3    "
                style={{ height: "500px" }}
              >
                {images.map((image, index) => (
                  <div
                    className="flex justify-center h-fit relative p-3 "
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
                  style={{ width: "350px", maxHeight: "500px" }}
                />
              </div>
            </div>
            {/* text */}
            <div className="grid  gap-3  lg:text-left h-[520px] w-[600px] overflow-y-auto ">
              <div>
                <div className="flex gap-0 h-10 mb-0">
                  <button
                    className={`${display === "details" ? " border-b-transparent  rounded-t-lg  bg-black text-white  " : ""}px-5  py-1 font-pr font-bold`}
                    onClick={() => setDisplay("details")}
                  >
                    DETAILS
                  </button>
                  <button
                    className={`${display === "description" ? " border-b-transparent border-2 rounded-t-lg  bg-black text-white " : ""} px-5  py-1 font-primary font-bold`}
                    onClick={() => setDisplay("description")}
                  >
                    DESCRIPTION
                  </button>
                </div>
              </div>
              {display === "details" ? (
                <>
                  <h1 className="text-[26px] font-bold font-primary uppercase mb-2 max-w-[450px]   lg:mx-0">
                    {name}
                  </h1>
                  <div className="text-2xl text-gray-900 font-extrabold mb-6">
                    $ {price}.00
                  </div>

                  <p className="mb-2 font-primary font-medium text-xl ">
                    {shortDescription}
                  </p>

                  <p
                    className="text-lg text-gray-500 dark:text-gray-400"
                    style={{ fontWeight: "bold" }}
                  >
                    <div
                      className="flex gap-3 my-1 ml-10  p-1 px-4 rounded-md  "
                      style={{ width: "fit-content" }}
                    >
                      {product.colors.map((color, index) => (
                        <div
                          className="w-10 h-10 rounded-full  border-2 border-gray-900 flex justify-center  items-center cursor-pointer"
                          style={{ backgroundColor: color }}
                          key={index}
                          onClick={() =>
                            setChosenProduct({ ...chosenProduct, color })
                          }
                        >
                          {chosenProduct.color === color ? (
                            <div
                              className="w-5 h-5 rounded-full bg-black"
                              style={{ border: "2px solid white" }}
                            ></div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  </p>

                  {/* variants  */}

                  {product.variants &&
                    product.variants?.map((variant, key) => (
                      <>
                        <p className="mt-1" key={key}>
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
                                className={`${value == chosenProduct[variant.name] ? " bg-primary text-blue-100" : "text-blue-800 bg-blue-100 "} inline-flex items-center px-3 py-2 me-2 text-sm font-medium rounded-2xl cursor-pointer`}
                                onClick={() => {
                                  console.log(chosenProduct[variant.name]);
                                  setChosenProduct({
                                    ...chosenProduct,
                                    [variant.name]: value,
                                  });
                                }}
                              >
                                {value}
                              </span>
                            ))}
                          </div>
                        </p>
                      </>
                    ))}
                  <button
                    onClick={() => handleAddToCart(product, product.id)}
                    className="bg-gray-900 py-4 px-8 text-white rounded-lg"
                  >
                    Add to cart
                  </button>
                </>
              ) : (
                <>
                  <p className="font-primary font-medium text-xl">
                    {" "}
                    {fullDescription}{" "}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <div>
        <Reviews reviews={reviews} />
      </div>
    </>
  ) : (
    <ProductDetailsPlaceholder />
  );
};

export default ProductDetails;
