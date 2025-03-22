import React, { useState } from "react";
import { Calendar } from "lucide-react";
import AdminSideNavbar from "../../../Components/AdminSideNavbar";
import AdminUpperNavbar from "../../../Components/AdminUpperNavbar";

const AcaDetails = () => {
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

  const [activeTab, setActiveTab] = useState("Education Qualifications");

  return (
    <div className="flex bg-[#E3EDF9]">
      <AdminSideNavbar />
      <div className="flex-col">
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
                <h2 className="text-xl font-medium mb-6">
                  Academic Records / Academic Details
                </h2>

                <div className="space-y-6">
                  {/* Institution and Department */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name of Institution
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                        placeholder="Babcock University"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                        placeholder="Computer Dept"
                      />
                    </div>
                  </div>

                  {/* Course and Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                        placeholder="Ogun state, Nigeria"
                      />
                    </div>
                  </div>

                  {/* Start and End Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full p-3 bg-[#F1F4FA] rounded-lg pr-10"
                          placeholder="01/01/1998"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full p-3 bg-[#F1F4FA] rounded-lg pr-10"
                          placeholder="01/01/2019"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows="6"
                      className="w-full bg-[#F1F4FA] p-3 rounded-lg"
                      placeholder="• Gathering and evaluating product requirements, in collaboration with product managers and the developers
• Illustrating design ideas using storyboards, process flows, and sitemaps
• Designing graphic user interface pages and elements, like menus, tabs, and widgets
• Design wireframes, mockups, storyboards, and fully interactive prototype design
• Conduct usability testing to ensure alignment to design strategy
• Conduct ongoing user research
• Implementation of UI/UX best practices and principles"
                    />
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

export default AcaDetails;
