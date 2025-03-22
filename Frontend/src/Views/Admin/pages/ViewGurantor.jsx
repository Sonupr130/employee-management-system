import React, { useState } from "react";
import AdminSideNavbar from "../../../Components/AdminSideNavbar";
import AdminUpperNavbar from "../../../Components/AdminUpperNavbar";

const GuarantorDetails = () => {
  const menuItems = [
    "Personal Details",
    "Contact Details",
    "Next of Kin Details",
    "Education Qualifications",
    "Guarantor Details",
    "Family Details",
    "Job Details",
    "Financial Details",
  ];

  const [activeTab, setActiveTab] = useState("Guarantor Details");

  return (
    <div className="flex bg-[#E3EDF9]">
      <AdminSideNavbar />
      <div className="flex-col w-full">
        <AdminUpperNavbar />

        <div className="my-4 mx-4 w-[80vw] h-screen rounded-lg">
          <div className="mb-3">
            <h1 className="text-xl font-semibold">
              Employee Mgmt / Employee Profile / John Doe
            </h1>
          </div>

          <div className="px-4 pt-3 flex gap-6">
            {/* Left Menu */}
            <div className="w-64 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`w-full text-left p-4 rounded-lg ${
                    item === activeTab
                      ? "bg-[#FFC107] text-black"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-lg p-8">
              <div className="max-w-3xl">
                <h2 className="text-xl font-medium mb-6">View Guarantor Details</h2>

                <div className="space-y-4">
                  {/* Guarantor's Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guarantor's Name
                    </label>
                    <div className="bg-[#F1F4FA] p-4 rounded-lg">
                      <p>Babcock University</p>
                    </div>
                  </div>

                  {/* Job Title / Occupation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title / Occupation
                    </label>
                    <div className="bg-[#F1F4FA] p-4 rounded-lg">
                      <p>Babcock University</p>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone No
                    </label>
                    <div className="bg-[#F1F4FA] p-4 rounded-lg">
                      <p>090 500 500 6000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuarantorDetails;
