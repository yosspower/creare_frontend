import React from "react";

import { Link } from "react-router-dom";
import bghero from "../img/bghero.jpg";

const Hero = () => {
  return (
    <section className="relative h-[800px] w-full overflow-hidden flex items-center">
      {/* background image */}
      <img
        src={bghero}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      <div className="container relative z-10 mx-auto flex h-full">
        {/* text */}
        <div className="flex flex-col justify-center text-white">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] mr-3 bg-[#00ADB5]"></div>Hot Trend
          </div>
          <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-6">
            Create Your Ideas
            <br />
            <span className="font-light">new collection</span>
          </h1>
          <Link
            to={"/shop"}
            className="self-start uppercase font-semibold border-b-2 border-[#00ADB5] pb-1 hover:text-[#00ADB5] transition-colors"
          >
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
