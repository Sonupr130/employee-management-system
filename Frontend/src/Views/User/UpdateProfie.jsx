import React, { useState } from "react";
import Navbar from "./Usernavbar";

const Updateprofile = () => {
  return (
    <div className="ml-8 bg-white flex-1 p-6 pl-8 rounded-lg">
          <div className="mt-6 flex justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  Edit
                </button>
              </div>
            <div className="max-w-md mx-auto bg-white  rounded-lg p-6">
              {/* Employee Profile Image */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-yellow-300 flex items-center justify-center text-3xl font-bold text-white">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Profile"
                    className="rounded-full"
                  />
                </div>
              </div>
              

              {/* Employee Details */}
              <div className="mt-10 text-center space-y-4">
                <div className="text-lg font-bold">John Doe Francis</div>
                <div className="text-gray-600">Design & Marketing</div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-10">
                    <div className="text-sm text-gray-500">Job Title</div>
                    <div className="text-lg font-semibold">UI / UX Designer</div>
                  </div>
                  <div className="mt-10">
                    <div className="text-sm text-gray-500">Job Category</div>
                    <div className="text-lg font-semibold">Full time</div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              
            </div>
          </div>
  );
};

export default Updateprofile;










