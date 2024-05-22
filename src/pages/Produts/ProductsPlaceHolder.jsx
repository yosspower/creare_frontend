import React from 'react';

function ProductsPlaceHolder() {
  return (
    <>
    {Array(6).fill('').map((_, index) => (
      <div key={index} className="p-4 bg-white rounded-md shadow animate-pulse">
        <div className="bg-gray-300 h-48 w-full rounded-md mb-4"></div>
        <div className="bg-gray-300 h-6 w-3/4 rounded-md mb-2"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded-md"></div>
      </div>
    ))}
  </>
  );
}

export default ProductsPlaceHolder;
