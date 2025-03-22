import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page_404 flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-6xl font-bold text-gray-800">Page Not Found</h1>

        {/* Illustration */}
        <div
          className="h-[300px] w-[400px] mx-auto bg-contain bg-no-repeat bg-center bg-green-300"
          style={{
            backgroundImage: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)`,
          }}
        ></div>

        {/* Text */}
        <div className="mb-4 translate-y-[-60px]">
          <h3 className="text-2xl font-semibold text-gray-800">
            Look like you're lost
          </h3>
          <p className="text-gray-600">
            The page you are looking for is not available!
          </p>
        </div>

        {/* Button */}
        <div className="translate-y-[-50px]">
        <Link
          to="/"
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700"
        >
          Go to Home
        </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
