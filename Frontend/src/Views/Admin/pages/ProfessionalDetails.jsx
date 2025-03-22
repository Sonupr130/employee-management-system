import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import AdminSideNavbar from "../../../Components/AdminSideNavbar";
import AdminUpperNavbar from "../../../Components/AdminUpperNavbar";

const ProfessionalDetails = () => {



    const menuItems = [
        "Personal Details",
        "Contact Details",
        "Next of kin Details",
        "Education Qualifications",
        "Guarantor Details",
        "Family Details",
        "Job Details",
        "Financial Details",
      ];
    
      const [activeTab, setActiveTab] = useState("Education Qualifications");

  return (
    <div className="flex bg-[#E3EDF9]">
      <AdminSideNavbar />
      <div className="flex-col">
        <AdminUpperNavbar />

        <div className="my-4 mx-4 w-[80vw] h-screen rounded-lg">
          <div className="mb-3">
            <h1 className="text-xl font-semibold">
              Employee Mgmt / Employee Profile / Jhon Doe
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
              item === activeTab ? 'bg-[#FFC107] text-black' : 'bg-white hover:bg-gray-50'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg p-8">
        <div className="max-w-3xl">
          <h2 className="text-xl font-medium mb-6">Professional Records / Professional Details</h2>
          
          <div className="space-y-6">
            {/* Company and Title */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                  value="Google Inc"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                  value="Web Developer"
                  readOnly
                />
              </div>
            </div>

            {/* Employment Type and Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 bg-[#F1F4FA] rounded-lg pr-10"
                    value="Remote"
                    readOnly
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">▼</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                  value="United States"
                  readOnly
                />
              </div>
            </div>

            {/* Start and End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 bg-[#F1F4FA] rounded-lg pr-10"
                    value="01/01/1998"
                    readOnly
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 bg-[#F1F4FA] rounded-lg pr-10"
                    value="01/01/2019"
                    readOnly
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <div className="bg-[#F1F4FA] p-4 rounded-lg space-y-2 text-sm">
                <p>• Gathering and evaluating product requirements, in collaboration with product managers and the developers</p>
                <p>• Illustrating design ideas using storyboards, process flows, and sitemaps</p>
                <p>• Designing graphic user interface pages and elements, like menus, tabs, and widgets</p>
                <p>• Design wireframes, mockups, storyboards, and fully interactive prototype design</p>
                <p>• Conduct Usability testing to ensure alignment to design strategy</p>
                <p>• Conduct an ongoing user research</p>
                <p>• Implementation of UI/UX best practices and principles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          </div>
          </div>
          </div>
  )
}

export default ProfessionalDetails