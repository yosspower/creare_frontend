import React, { useState } from "react";
import axios from "axios";  // Added this line
import avatar from "../img/user.png";
import axiosInstance from "../api/axiosInstance";

export default function Reviews({ reviews, id }) {
  const [stars, setStars] = useState(0);
  const [reviewText, setReviewText] = useState("");  // Added this line
console.log(reviews);
  const renderStars = (rating) => {
    const starsArray = [];
    for (let i = 1; i <= 5; i++) {
      starsArray.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 ${i <= rating ? "text-yellow-500" : "text-gray-400"}`}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      );
    }
    return starsArray;
  };

  const calculateDaysAgo = (dateString) => {
    const reviewDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - reviewDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  // Added this function
  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
      const response = await axiosInstance.post(`/products/add-review/${id}`, {
        rating:stars,
        body:  reviewText,

    
      });
      console.log("Review submitted successfully", response.data);
      
      setStars(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };


  return (
    <>
      <section className="grid mx-auto max-w-4xl px-4 py-32 md:px-6">
        <div className="grid grid-col gap-2">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Add Review
            </h2>
            <div className="flex items-center gap-1 ">
              <div onClick={() => setStars(1)}>
                <StarIcon
                  className={`${stars >= 1 ? " fill-gray-950 " : ""} h-10 w-10 cursor-pointer   `}
                />
              </div>

              <div onClick={() => setStars(2)}>
                <StarIcon
                  className={`${stars >= 2 ? " fill-gray-950 " : ""} h-10 w-10 cursor-pointer   `}
                />
              </div>

              <div onClick={() => setStars(3)}>
                <StarIcon
                  className={`${stars >= 3 ? " fill-gray-950" : ""} h-10 w-10 cursor-pointer   `}
                />
              </div>

              <div onClick={() => setStars(4)}>
                <StarIcon
                  className={`${stars >= 4 ? " fill-gray-950 " : ""} h-10 w-10 cursor-pointer   `}
                />
              </div>
              <div onClick={() => setStars(5)}>
                <StarIcon
                  className={`${stars == 5 ? " fill-gray-950 " : ""} h-10 w-10 cursor-pointer   `}
                />
              </div>
              <div></div>
            </div>
          </div>
          {/* //hhhhhhh */}
          </div>
          <div className="grid gap-8" />

          <div className="grid gap-4 md:grid-cols-4 md:items-center">
            <div className="flex items-center gap-2 md:col-span-4"></div>
            <div className="flex items-center gap-2 md:col-span-4">
            <textarea
                className="h-40 w-full md:w-[500px] resize-none p-2 border border-gray-300 rounded"
                id="review"
                placeholder="Write your review..."
              
                onChange={(e) => setReviewText(e.target.value)}  // Added this line
              ></textarea>
              <button type="submit" onClick={handleSubmit} className="w-[250px] h-14 text-lg text-white bg-gray-800 py-1 justify-center mx-auto">
                Leave a Review
              </button>
       
          </div>
        </div>
      </section>
      <section>
        {reviews.length > 0 ? (
          <>
            <div className="text-2xl font-bold tracking-tight md:text-3xl text-center">Reviews:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 md:px-6 py-12">
              {reviews.map((review, indx) => (
                <div
                  className="bg-white rounded-lg overflow-hidden border shadow-md"
                  key={indx}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10">
                          <img
                            className="aspect-square h-full w-full"
                            alt="@shadcn"
                            src={avatar}
                          />
                        </span>
                        <div>
                          <h4 className="font-semibold">Sarah Johnson</h4>
                          <p className="text-sm text-gray-500">{calculateDaysAgo(review.date)} days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="mt-4 text-gray-950 leading-relaxed">
                      {review.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : ""}
      </section>
    </>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
}

function Select({ children, defaultValue, id }) {
  return (
    <div className="relative inline-block w-full text-left">
      <select
        defaultValue={defaultValue}
        id={id}
        className="block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm sm:leading-5"
      >
        {children}
      </select>
    </div>
  );
}

function SelectTrigger({ children }) {
  return <>{children}</>;
}

function SelectValue({ placeholder }) {
  return (
    <option value="" disabled>
      {placeholder}
    </option>
  );
}

function SelectContent({ children }) {
  return <>{children}</>;
}

function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

function Input({ id, placeholder }) {
  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
    />
  );
}

function Textarea({ className, id, placeholder }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ${className}`}
    />
  );
}

function Button({ className, children }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${className}`}
    >
      {children}
    </button>
  );
}
