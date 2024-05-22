import React from "react";
import LockIcon from "/public/LockIcon.jsx";
import CheckIcon from "/public/CheckIcon.jsx";
import RefreshCwIcon from "/public/RefreshCwIcon.jsx";
import TruckIcon from "/public/TruckIcon.jsx";

export default function TrustBadges() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Why Choose Us?</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md ">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F2937] text-white ">
              <TruckIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Free Shipping</h3>
              <p className="text-sm text-gray-500 ">
                Free shipping on all orders
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md ">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F2937] text-white ">
              <RefreshCwIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">30-Day Returns</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No questions asked
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md ">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F2937] text-white ">
              <LockIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Secure Payments</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Encrypted with SSL
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md ">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F2937] text-white ">
              <CheckIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">100% Authentic</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Guaranteed genuine products
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
