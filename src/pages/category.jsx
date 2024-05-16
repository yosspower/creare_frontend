import React from "react";
import mugImage from '../img/muge.jpg'; 
import ClothingImage from '../img/clothes.jpg'; 
import giftImage from '../img/gift.jpg'; 
import TrustBadges from "../components/TrustBadges";
import "./home.css";

const Home = () => {
  return (
    <div>
      <section className="py-40">
        <div className="container mx-auto">
          <h1 className="text-5xl font-semibold mb-10 text-center text-gray-800">
            Discover Our Exclusive Categories
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-10">
            <div className="category-card relative overflow-hidden rounded-lg shadow-lg">
              <img src={mugImage} alt="Personalized Mug" className="w-full h-full object-cover transition duration-300 transform hover:scale-105" />
              <div className="overlay absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                <h2 className="text-3xl font-bold text-white mb-4">Personalized Mugs</h2>
                <button className="bg-[#00ADB5] text-[#EEEEEE] py-3 px-8 rounded-full hover:bg-opacity-80 transition duration-300 transform hover:translate-y-1 hover:shadow-lg relative">
                  <span className="text-lg font-semibold">Explore Now</span>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="9" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="category-card relative overflow-hidden rounded-lg shadow-lg">
              <img src={ClothingImage} alt="Personalized Clothing" className="w-full h-full object-cover transition duration-300 transform hover:scale-105" />
              <div className="overlay absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                <h2 className="text-3xl font-bold text-white mb-4">Personalized Clothing</h2>
                <button className="bg-[#00ADB5] text-[#EEEEEE] py-3 px-8 rounded-full hover:bg-opacity-80 transition duration-300 transform hover:translate-y-1 hover:shadow-lg relative">
                  <span className="text-lg font-semibold">Explore Now</span>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="9" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="category-card relative overflow-hidden rounded-lg shadow-lg">
              <img src={giftImage} alt="Personalized Gifts" className="w-full h-full object-cover transition duration-300 transform hover:scale-105" />
              <div className="overlay absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                <h2 className="text-3xl font-bold text-white mb-4">Personalized Gifts</h2>
                <button className="bg-[#00ADB5] text-[#EEEEEE] py-3 px-8 rounded-full hover:bg-opacity-80 transition duration-300 transform hover:translate-y-1 hover:shadow-lg relative">
                  <span className="text-lg font-semibold">Explore Now</span>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="9" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="category-card relative overflow-hidden rounded-lg shadow-lg">
              <img src={giftImage} alt="Personalized Gifts" className="w-full h-full object-cover transition duration-300 transform hover:scale-105" />
              <div className="overlay absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300">
                <h2 className="text-3xl font-bold text-white mb-4">Personalized Gifts</h2>
                <button className="bg-[#00ADB5] text-[#EEEEEE] py-3 px-8 rounded-full hover:bg-opacity-80 transition duration-300 transform hover:translate-y-1 hover:shadow-lg relative">
                  <span className="text-lg font-semibold">Explore Now</span>
                  <svg className="absolute right-2 top-1/2 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="9" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            {/* Add more category cards here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
