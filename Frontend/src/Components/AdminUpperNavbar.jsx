import React from "react";

const AdminUpperNavbar = () => {
  return (
    <div>
      <div className="flex items-center justify-between bg-[#E3EDF9] w-90 mx-4 py-2 px-6 shadow-md rounded-lg">
        {/* Hamburger Icon */}
        <div className="text-black flex items-center cursor-pointer">
          <span className="material-icons text-4xl">menu</span>
        </div>

        {/* Dropdown and Search */}
        <div className="flex items-center w-[50vw] bg-white rounded-lg overflow-hidden shadow">
          {/* Dropdown */}
          <div className="flex items-center bg-blue-700 text-white px-4 py-3">
            <span>All Candidates</span>
            <span className="material-icons ml-1">arrow_drop_down</span>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="p-3 w-[36vw] bg-white bg-transparent focus:outline-none"
          />

          {/* Search Icon */}
          <div className="text-gray-500 flex items-center cursor-pointer">
            <span className="material-icons text-3xl">search</span>
          </div>
        </div>

        {/* Notification and Icons */}
        <div className="flex space-x-4 items-center">
          {/* Notification Bell */}
          <div className="relative">
            <span className="material-icons text-blue-700 text-3xl">
              notifications
            </span>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </div>

          {/* Wrench/Tools Icon */}
          <div className="relative">
            <span className="material-icons text-yellow-500 text-3xl">
              build
            </span>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              1
            </span>
          </div>

          {/* Mail Icon */}
          <div className="relative">
            <span className="material-icons text-green-600 text-3xl">mail</span>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpperNavbar;
