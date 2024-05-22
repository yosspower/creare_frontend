import React, { useContext, useState, useEffect } from "react";

import Product from "../components/Product";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";

import { setBestProducts, setProducts } from "../Toolkit/productSlice";
import "./home.css";
import { getAllProducts, getBestProducts } from "../api/products";
import { Link } from "react-router-dom";
const Home = () => {
  // get products from product context
  const dispatch = useDispatch();

  const bestProducts = useSelector((state) => state.products.bestProducts);

  // get only men's and women's clothing category

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
    fetchProducts();
  }, []);
  return (
    <div>
      <Hero />
      <section className="py-20 ">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {bestProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
          <div className="text-end">
            <Link
              className="items-center justify-center px-3 py-4 border border-transparent text-lg font-medium rounded-sm shadow-sm text-white bg-[#1F2937]    w-1/4"
              to={`/shop`}
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
