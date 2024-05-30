import React from "react";


function  ProductDetailsPlaceholder(){



    return (
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12 w-full max-w-6xl mx-auto my-32 py-6 px-4">
        <div className="flex flex-col md:flex-row items-start gap-6 w-full">
          <div className="flex-1 grid gap-4">
            <div className="animate-pulse bg-gray-300 h-[300px] rounded-lg"></div>
            <div className="grid gap-2">
              <div className="animate-pulse rounded-md bg-gray-300 h-6 w-[80%]"></div>
              <div className="animate-pulse rounded-md bg-gray-300 h-4 w-[60%]"></div>
              <div className="animate-pulse rounded-md bg-gray-300 h-4 w-[70%]"></div>
            </div>
          </div>
          <div className="flex-1 grid gap-4">
            <div className="animate-pulse rounded-md bg-gray-300 h-8 w-[50%]"></div>
            <div className="animate-pulse rounded-md bg-gray-300 h-6 w-[80%]"></div>
            <div className="animate-pulse rounded-md bg-gray-300 h-4 w-[90%]"></div>
            <div className="animate-pulse rounded-md bg-gray-300 h-4 w-[90%]"></div>
            <div className="animate-pulse rounded-md bg-gray-300 h-10 w-[30%]"></div>
          </div>
        </div>
        {/* <div className="flex flex-col md:flex-row items-start gap-6 w-full">
          <div className="flex-1">
            <div className="animate-pulse bg-gray-300 aspect-square rounded-lg w-full h-full"></div>
          </div>
          <div className="flex-1 grid gap-4">
            <div className="animate-pulse rounded-md bg-gray-300 h-8 w-[60%]"></div>
            <div className="animate-pulse rounded-md bg-gray-300 h-6 w-[40%]"></div>
            <div className="flex items-center gap-2">
              <div className="animate-pulse bg-gray-300 w-5 h-5 rounded-full"></div>
              <div className="animate-pulse bg-gray-300 w-5 h-5 rounded-full"></div>
              <div className="animate-pulse bg-gray-300 w-5 h-5 rounded-full"></div>
              <div className="animate-pulse bg-gray-300 w-5 h-5 rounded-full"></div>ku
              <div className="animate-pulse bg-gray-300 w-5 h-5 rounded-full"></div>
              <div className="animate-pulse bg-gray-300 h-4 w-[50%]"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="animate-pulse rounded-md bg-gray-300 h-8 w-[20%]"></div>
              <div className="animate-pulse bg-gray-300 h-11 rounded-md w-[30%]"></div>
            </div>
          </div>
        </div> */}
      </div>
    );
  };

  export default ProductDetailsPlaceholder;