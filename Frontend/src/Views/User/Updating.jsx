import React, { useState } from "react";
import Navbar from "./Usernavbar";
import Ctc from "./Ctc";
import NextDetails from "./NextDetails";
import EducationQualifications from "./Educational";
import GuarantorDetails from "./GurantorDetails";
import JobDetails from "./JobDetails";
import FamilyDetails from "./FamilyDetails";
import FinancialDocs from "./FinancialDocs";
import Personaldetails from "./Personaldetails";

const Updateprofile = () => {
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

  const [activeTab, setActiveTab] = useState("Personal Details");

  // Define content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case "Personal Details":
        return <Personaldetails />; // Replace with the actual component or content
      case "Contact Details":
        return <Ctc />;
      case "Next of Kin Details":
        return <NextDetails />;
      case "Education Qualifications":
        return <EducationQualifications />;
      case "Guarantor Details":
        return <GuarantorDetails />;
      case "Family Details":
        return <FamilyDetails />;
      case "Financial Details":
        return <FinancialDocs />;
      case "Job Details":
        return <JobDetails />;
      default:
        return <div>Select a valid tab from the sidebar</div>;
    }
  };

  return (
    <div className="bg-[#E3EDF9] py-4">
      
      <div className="p-4 ml-6 mr-6 bg-white text-2xl hover:text-blue-500">
        Dashboard/applyforleave
      </div>

      <div className="flex gap-4 h-screen mt-4 justify-center rounded-lg bg-[#E3EDF9]">
        <div className="w-max max-w-6xl h-[80vh] rounded-lg flex">
          {/* Sidebar */}
          <div className="w-1/3 mt-6 rounded-lg h-full  border-r bg-white p-4">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`w-full  text-center p-4 rounded-lg ${
                    item === activeTab
                      ? "bg-[#FFC107] text-black"
                      : "bg-[#E3EDF9] hover:bg-blue-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="mx-auto bg-[#E3EDF9] flex-1 p-6 pl-8 rounded-lg ">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updateprofile;
