import React, { useState } from "react";
import Leavesetings from "./Leavesetings";
import Leaverecall from "./Leaverecall";
import LeaveHistory from "./Leavehistory";

const LeaveManagement = () => {
  const [activeButton, setActiveButton] = useState("settings");

  const renderContent = () => {
    switch (activeButton) {
      case "settings":
        return <Leavesetings />;
      case "recall":
        return <Leaverecall />;
      case "history":
        return <LeaveHistory/>
      case "relief":
        return <div>Relief Officers Component</div>;
      default:
        return <Leavesetings />;
    }
  };

  return (
    <div className="flex bg-[#E3EDF9] h-screen">
      {/* <AdminSideNavbar /> */}
      <div className="flex-col">
        {/* <AdminUpperNavbar /> */}

        <div className="bg-blue-100 my-4 mx-4 w-[80vw] h-auto rounded-lg">
          {/* Header */}
          <header className="flex items-center p-6 bg-blue-100">
            <span className="material-icons text-3xl mr-2">menu_book</span>
            <h1 className="text-2xl font-bold">Leave Management</h1>
          </header>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 my-4">
            <button
              className={`w-[290px] h-[70px] py-2 px-2 rounded-lg ${
                activeButton === "settings"
                  ? "bg-yellow-400 text-black"
                  : "bg-blue-700 text-white hover:bg-blue-800"
              }`}
              onClick={() => setActiveButton("settings")}
            >
              Leave Settings
            </button>
            <button
              className={`w-[290px] h-[70px] py-2 px-2 rounded-lg ${
                activeButton === "recall"
                  ? "bg-yellow-400 text-black"
                  : "bg-blue-700 text-white hover:bg-blue-800"
              }`}
              onClick={() => setActiveButton("recall")}
            >
              Leave Recall
            </button>
            <button
              className={`w-[290px] h-[70px] py-2 px-2 rounded-lg ${
                activeButton === "history"
                  ? "bg-yellow-400 text-black"
                  : "bg-blue-700 text-white hover:bg-blue-800"
              }`}
              onClick={() => setActiveButton("history")}
            >
              Leave History
            </button>
            <button
              className={`w-[290px] h-[70px] py-2 px-2 rounded-lg ${
                activeButton === "relief"
                  ? "bg-yellow-400 text-black"
                  : "bg-blue-700 text-white hover:bg-blue-800"
              }`}
              onClick={() => setActiveButton("relief")}
            >
              Relief Officers
            </button>
          </div>

          {/* Main Banner Section */}
          <div className="bg-blue-900 text-white rounded-lg  mx-4 mt-6">
            <div>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;

