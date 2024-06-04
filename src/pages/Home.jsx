import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Hero from "../components/Hero";
import Product from "../components/Product";
import { setBestProducts, setCategories } from "../Toolkit/productSlice";
import { getBestProducts } from "../api/products";
import { getAllCategories } from "../api/categories"; // Import the new API function
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();

  const bestProducts = useSelector((state) => state.products.bestProducts);
  const categories = useSelector((state) => state.products.categories);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getBestProducts();
        if (response) {
          dispatch(setBestProducts(response));
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response) {
          dispatch(setCategories(response));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-8 max-w-sm mx-auto md:max-w-none md:mx-0">
            {bestProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
          <div className="text-center mt-10 flex justify-center">
            <Link
              className=" flex text-center items-center h-14 w-fit px-5 gap-3  border border-transparent text-lg font-medium rounded-md  text-white bg-[#00ADB5] hover:bg-[#248287]"
              to={`/shop`}
            >
              <span className=""> All products </span>
                
              <FaArrowRight size={20} />
               
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 bg-[#EEEEEE]">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Categories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-sm mx-auto md:max-w-none md:mx-0">
            {categories.slice(0, 5).map((category) => {
              return (
                <Link to={`/category/${category.id}`} key={category.id}>
                  <div className="pb-5 bg-white shadow rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover mb-4 rounded-t-lg"
                    />
                    <h2 className="text-xl font-semibold mb-2 text-center opacity-1 hover:opacity-100 transition-opacity duration-300">
                      {category.name}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10 flex justify-center">
            <Link
              className=" flex text-center items-center h-14 w-fit px-5 gap-3  border border-transparent text-lg font-medium rounded-md  text-white bg-[#00ADB5] hover:bg-[#248287]"
              to={`/categories`}
            >
              <span className="">  Explore More </span>
                
              <FaArrowRight size={20} />
               
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
