import React ,{useEffect,useState}from "react";
import ProductCard from "../../components/ProductCard";
import { Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";

import {Link} from 'react-router-dom';
import { setProducts } from "../../Toolkit/productSlice";
import { getAllProducts } from "../../api/products";
export default function Shop() {
  const products = useSelector((state) => state.products.data);
  const dispatch = useDispatch();
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
  return(
    <>




    <div className="grid md:grid-cols-[240px_1fr] gap-8 px-4 md:px-6 mt-24 py-8">
      <div className="bg-white rounded-lg shadow-sm dark:bg-gray-950 dark:border dark:border-gray-800 p-4 md:p-6">
        <h2 className="text-3xl font-bold font-primary mb-4">Filters</h2>
        <div className="grid gap-6">
          <div>
            <h3 className="text-2xl  font-primary font-bold mb-2">Category</h3>
            <div className="grid gap-2">
              <label className="flex items-center gap-2 font-normal">
                <Checkbox defaultChecked id="category-all" />
                All
              </label>
              <label className="flex items-center gap-2 font-normal">
                <Checkbox id="category-clothing" />
                Clothing
              </label>
              <label className="flex items-center gap-2 font-normal">
                <Checkbox id="category-electronics" />
                Electronics
              </label>
              <label className="flex items-center gap-2 font-normal">
                <Checkbox id="category-home" />
                Home
              </label>
              <label className="flex items-center gap-2 font-normal">
                <Checkbox id="category-toys" />
                Toys
              </label>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 font-primary">Price Range</h3>
          
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-400" htmlFor="min-price">
            Min Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              className="focus:ring-primary focus:border-primary block w-full pl-7 py-3 pr-12 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              id="min-price"
              name="min-price"
              placeholder="0"
              type="number"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-400" htmlFor="max-price">
            Max Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              className="focus:ring-primary focus:border-primary py-3 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              id="max-price"
              name="max-price"
              placeholder="1000"
              type="number"
            />
          </div>
        </div>
      </div>
   

          </div>
         
          <div className="flex ">
        <button
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-md font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-full"
          type="button"
        >
          Apply Filters
        </button>
      </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <>
          <ProductCard key={index} product={product} />
          </>
        ))}
      </div>
    </div>
  


    </>
  )
}
