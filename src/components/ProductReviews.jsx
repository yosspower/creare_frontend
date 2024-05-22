import React from 'react';

export default function Reviews() {


  
  return (
    <section className="grid mx-auto max-w-4xl px-4 py-2 md:px-6 md:py-2">
      <div className="grid grid-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Customer Reviews</h2>
          <div className="flex items-center gap-1">
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-primary" />
            <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
            <span className="text-sm font-medium">4.2 out of 5</span>
          </div>
        </div>
        <div className="grid gap-8" />
        <div className="grid gap-4 md:grid-cols-4 md:items-center">
          <div className="flex items-center gap-2 md:col-span-4">
            <Label htmlFor="rating">Rating:</Label>
            <Select defaultValue="5" id="rating">
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 star</SelectItem>
                <SelectItem value="2">2 stars</SelectItem>
                <SelectItem value="3">3 stars</SelectItem>
                <SelectItem value="4">4 stars</SelectItem>
                <SelectItem value="5">5 stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 md:col-span-4">
            <Label htmlFor="name">Name:</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="flex items-center gap-2 md:col-span-4">
            <Textarea className="h-20 resize-none" id="review" placeholder="Write your review..." />
          </div>
          <Button className="md:col-span-4 mx-auto">Leave a Review</Button>
        </div>
      </div>
    </section>
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
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function Select({ children, defaultValue, id }) {
  return (
    <div className="relative inline-block w-full text-left">
      <select defaultValue={defaultValue} id={id} className="block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm sm:leading-5">
        {children}
      </select>
    </div>
  );
}

function SelectTrigger({ children }) {
  return <>{children}</>;
}

function SelectValue({ placeholder }) {
  return <option value="" disabled>{placeholder}</option>;
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
