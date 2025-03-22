import React, { useState } from "react";
import AdminSideNavbar from "../../../Components/AdminSideNavbar";
import AdminUpperNavbar from "../../../Components/AdminUpperNavbar";
import ViewDocuments from "../../User/ViewDocs";

const ViewJobDetails = () => {
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


  const [isViewingDocuments, setIsViewingDocuments] = useState(false);

  const handleViewDocuments = () => {
    setIsViewingDocuments(true); // Switch to ViewDocuments component
  };

  const handleBackToJobDetails = () => {
    setIsViewingDocuments(false); // Switch back to job details
  };

  if (isViewingDocuments) {
    return (
      <div className="p-3">
        <ViewDocuments />
        {/* <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          onClick={handleBackToJobDetails}
        >
          Back to Job Details
        </button> */}
      </div>
    );
  }

  return (
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
                  <button onClick={handleViewDocuments} className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
                    View Documents
                  </button>
                </div>
              </div>
            </div>
  );
};

export default ViewJobDetails;
