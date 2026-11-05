import React, { useState, useEffect } from "react";

import { getAllCategories } from "../../api/categories.js";
import "../home.css"; // Ensure your CSS file is correctly imported
import { useDispatch } from "react-redux";
import { getCategoryFilter } from "../../Toolkit/productSlice.js";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const dispatch = useDispatch();
  const [redirectToShop, setRedirectToShop] = useState(false);

  const goToCategorie = (categoryId) => {
    dispatch(getCategoryFilter(categoryId));
    setRedirectToShop(true);
  };

  // Function to fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData); // Update categories state with data from the backend
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <section className="pt-40 pb-24 bg-gradient-to-b from-[#F7F7F7] to-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-[#00ADB5] mb-3">
              Shop by category
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Discover Our Exclusive Categories
            </h1>
            <p className="text-gray-500">
              Browse our collections and find the perfect product to customize.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold text-white drop-shadow">
                    {category.name}
                  </h2>
                  <button
                    className="self-start inline-flex items-center gap-2 rounded-full bg-[#00ADB5] px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#248287]"
                    onClick={() => goToCategorie(category.id)}
                  >
                    <span>Explore Now</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="9" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {redirectToShop && <Navigate to={`/shop`} />}
    </div>
  );
};

export default Home;
