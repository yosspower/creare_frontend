import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Hero from "../components/Hero";
import Product from "../components/Product";
import {
  getCategoryFilter,
  setBestProducts,
  setCategories,
  setFilter,
} from "../Toolkit/productSlice";
import { getBestProducts } from "../api/products";
import { getAllCategories } from "../api/categories"; // Import the new API function
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const bestProducts = useSelector((state) => state.products.bestProducts);
  const categories = useSelector((state) => state.products.categories);
  const [redirectToShop, setRedirectToShop] = useState(false);
  const goToCategorie = (categoryId) => {
    dispatch(getCategoryFilter(categoryId));
    setRedirectToShop(true);
  };
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
      <section className="py-20 bg-[#EEEEEE]">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Categories
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-sm mx-auto md:max-w-none md:mx-0">
            {categories.slice(0, 5).map((category) => {
              return (
                <Link
                  onClick={() => goToCategorie(category.id)}
                  key={category.id}
                  className="group block"
                >
                  <div className="relative h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <h2 className="absolute bottom-4 left-0 right-0 text-center text-lg font-semibold text-white">
                      {category.name}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10 flex justify-center">
            <Link
              to={"/categories"}
              className=" flex text-center items-center h-14 w-fit px-5 gap-3  border border-transparent text-lg font-medium rounded-md  text-white bg-[#00ADB5] hover:bg-[#248287]"
            >
              <span className=""> Explore More </span>

              <FaArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
      {redirectToShop && <Navigate to={`/shop`} />}
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
    </div>
  );
};

export default Home;
