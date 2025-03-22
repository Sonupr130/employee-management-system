import React, { useState } from "react";
import Navbar from "./Usernavbar";
import UploadDocs from "./UploadDocs"; // Import your UploadDocs component
import ViewDocs from "./ViewDocs"; // Import your ViewDocs component

const JobDetails = () => {
  const [currentView, setCurrentView] = useState("jobDetails"); // State to track which component to show

  return (
    <div className="flex-1 rounded-lg bg-[#E3EDF9]">
      {currentView === "jobDetails" && (
        <div className="max-w-2xl bg-white rounded-lg p-6 space-y-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            View Job Details
          </h2>
          <div className="space-y-6">
            <div className="flex justify-center">
              <h3 className="font-medium">Job Role</h3>
              <p className="text-lg font-semibold text-gray-700">
                UI UX Designer
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div className="mx-auto">
                <h3 className="font-medium">Department</h3>
                <p className="text-gray-700">Design & Marketing</p>
              </div>
              <div className="mx-auto">
                <h3 className="font-medium">Line Manager</h3>
                <p className="text-gray-700">Mr. Domino's Pizza</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg">Job Description</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>
                  Creating user-centered designs by understanding business
                  requirements and user feedback.
                </li>
                <li>
                  Creating user flows, wireframes, prototypes, and mockups.
                </li>
                <li>
                  Translating requirements into style guides, design systems,
                  design patterns, and attractive user interfaces.
                </li>
                <li>
                  Designing UI elements such as input controls, navigational
                  components, and informational components.
                </li>
                <li>
                  Creating original graphic designs (e.g., images, sketches,
                  and tables).
                </li>
                <li>
                  Identifying and troubleshooting UX problems (e.g.,
                  responsiveness).
                </li>
                <li>
                  Collaborating effectively with product, engineering, and
                  management teams.
                </li>
                <li>
                  Incorporating customer feedback, usage metrics, and
                  usability findings into design to enhance user experience.
                </li>
              </ul>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                className="bg-[#007BFF] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#0056b3] focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                onClick={() => setCurrentView("uploadDocs")} // Switch to UploadDocs view
              >
                Upload Documents
              </button>
              <button
                className="bg-white border border-[#007BFF] text-[#007BFF] px-6 py-3 rounded-lg shadow-md hover:bg-[#f0f8ff] focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                onClick={() => setCurrentView("viewDocs")} // Switch to ViewDocs view
              >
                View Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {currentView === "uploadDocs" && (
        <UploadDocs
          onBack={() => setCurrentView("jobDetails")} // Pass a callback to switch back
        />
      )}

      {currentView === "viewDocs" && (
        <ViewDocs
          onBack={() => setCurrentView("jobDetails")} // Pass a callback to switch back
        />
      )}
    </div>
  );
};

export default JobDetails;
