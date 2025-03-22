import React, { useState } from "react";
import AdminSideNavbar from "../../../Components/AdminSideNavbar";
import AdminUpperNavbar from "../../../Components/AdminUpperNavbar";

const JobDetails = () => {
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

  const [activeTab, setActiveTab] = useState("Job Details");

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
                <h2 className="text-xl font-medium mb-6">View Job Details</h2>

                <div className="space-y-6">
                  {/* Job Role */}
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1">
                      Job Role
                    </label>
                    <div className="text-2xl font-bold">UI UX Designer</div>
                  </div>

                  {/* Department and Line Manager */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <div className="text-lg font-semibold">Design & Marketing</div>
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Line Manager
                      </label>
                      <div className="text-lg font-semibold">Mr Domino's Pizza</div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Job Description
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Your responsibilities will include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>
                        Creating user-centered designs by understanding business
                        requirements and user feedback
                      </li>
                      <li>Creating user flows, wireframes, prototypes, and mockups</li>
                      <li>
                        Translating requirements into style guides, design systems,
                        design patterns, and attractive user interfaces
                      </li>
                      <li>
                        Designing UI elements such as input controls, navigational
                        components, and informational components
                      </li>
                      <li>
                        Creating original graphic designs (e.g., images, sketches,
                        and tables)
                      </li>
                      <li>
                        Identifying and troubleshooting UX problems (e.g.,
                        responsiveness)
                      </li>
                      <li>
                        Collaborating effectively with product, engineering, and
                        management teams
                      </li>
                      <li>
                        Incorporating customer feedback, usage metrics, and usability
                        findings into the design in order to enhance user experience
                      </li>
                    </ul>
                  </div>

                  {/* View Documents Button */}
                  <button className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
                    View Documents
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
