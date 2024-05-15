import React, { useContext, useState, useEffect } from "react";
import howhow from "../img/bghero.jpg";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Toolkit/productSlice";
import "./home.css";
import { getAllProducts } from "../api/products";
const Home = () => {
  // get products from product context
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.data);

  // get only men's and women's clothing category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        dispatch(setProducts(response));
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <Hero />
      <section className="py-20 ">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
