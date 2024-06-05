import React, { useRef, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../api/products";
import "./product.css";
import { SidebarContext } from "../../contexts/SidebarContext";
import Reviews from "../../components/ProductReviews";
import ProductDetailsPlaceholder from "../../components/placeholders/ProductDetailsPlaceholder";
import { MdOutlineDesignServices } from "react-icons/md";

import { FaPlus,FaMinus , FaCartPlus } from "react-icons/fa";
import AddDesignedCart from "./addToCart";
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

  const [chosenProduct, setChosenProduct] = useState({
    variants:{
      color:""
    },
    quantity:1
  });

  const { addToCart } = useContext(CartContext);

  //get the single product based on id
  const addReview = (product) => {
    console.log(product);
    setProduct(product);
  };
  useEffect(() => {
    const getProduct = async () => {
      const results = await getProductBySlug(slug);
      if (results) {
        setProduct(results);
        setDisplayImage(results.images[0]);

        setChosenProduct({...chosenProduct,slug:results.slug ,image:results.images[0],name:results.name,id:results.id,price:results.price})

      }
    };
    getProduct();
  }, []);
  const handleAddToCart = (product, id) => {
    setIsOpen(true);
    addToCart(chosenProduct, id);
  };

  // destructure product
  const { name, images, fullDescription, price, shortDescription, reviews } =
    product;
console.log( chosenProduct);
  return displayImage ? (
    <>
  
      <section className=" md:pt-32 mt-32 lg:mt-10 pb-[400px] md:pb-12 lg:py-32 flex justify-center ">
        <div className="container flex justify-center">
          {/* image and text wrapper */}
          <div className="grid lg:flex  justify-center   items-center gap-10  ">
            {/* images */}

            <div className=" grid  lg:flex gap-8 items-center justify-center">
              <div className=" flex lg:grid  max-w-sm cursor-pointer  justify-center gap-3 overflow-y-auto pr-3 md:h-[500px]  overflow-x-auto   ">
                {images.map((image, index) => (
                  <div
                    className="flex justify-center h-fit relative p-3  "
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
            <div className="grid  gap-3  lg:text-left h-[520px] md:w-[600px]  ">
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
                  <div className="flex gap-5 justify-between">

                
                  <div className="text-2xl text-gray-900 font-extrabold mb-6">
                    $ {price}.00
                  </div>
                  <div className="flex gap-2 items-center">

                  <label
    className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
    htmlFor="quantity"
  >
    Quantity
  </label>
  <div className="flex items-center gap-2">
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-8 h-8"
   onClick={()=>setChosenProduct({...chosenProduct,quantity:chosenProduct.quantity-1})}
  >
   <FaMinus size={15} />
      <span className="sr-only">Decrement</span>
    </button>
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      id="quantity"
      type="number"
      value={chosenProduct.quantity}
      onChange={(e)=>setChosenProduct({...chosenProduct,quantity:e.target.value})}
    />
        <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-8 h-8"
      onClick={()=>setChosenProduct({...chosenProduct,quantity:chosenProduct.quantity+1})}
   >
  <FaPlus size={15} />
      <span className="sr-only">Imcrement</span>
    </button>
  </div>




</div>

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
                            setChosenProduct({ ...chosenProduct,variants:{...chosenProduct.variants,color}  })
                          }
                        >
                          {chosenProduct.variants.color === color ? (
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
                                className={`${value == chosenProduct.variants[variant.name] ? " bg-primary text-blue-100" : "text-blue-800 bg-blue-100 "} inline-flex items-center px-3 py-2 me-2 text-sm font-medium rounded-2xl cursor-pointer`}
                                onClick={() => {
                                 
                                  setChosenProduct({
                                    ...chosenProduct,
                                    variants:{...chosenProduct.variants,[variant.name]: value},
                                    
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
                  <Link
                    to={`/${product.category.name}/design`}
                    className="bg-[#00ADB5] py-3 px-8 text-white rounded-lg flex justify-center gap-3"
                  >
                    <MdOutlineDesignServices size={26} />
                    <span> Start Designing </span>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product, product.id)}
                    className="bg-gray-900 py-4 px-8 text-white rounded-lg flex justify-center gap-3"
                  >
                    <FaCartPlus size={21} />
                    <span>Add to cart</span>
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
        <Reviews id={product.id} reviews={reviews} addReview={addReview} />
      </div>
    </>
  ) : (
    <ProductDetailsPlaceholder />
  );
};

export default ProductDetails;
