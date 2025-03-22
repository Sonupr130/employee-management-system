import React, { useState } from "react";
import TargetSetup from "./TargetSetup";
import ManageTargets from "./ManageTargets";
import Appraisal from "./Appraisals";
// import Targets from "./Targets";
// import Appraisals from "./Appraisals";
// import Settings from "./Settings";
// import Reports from "./Reports";

const PerformanceManagement = () => {
  const menuItems = ["Target Setup", "Targets", "Appraisals", "Settings", "Reports"];
  const [activeTab, setActiveTab] = useState("Target Setup");

  // Component Map
  const components = {
    "Target Setup": <TargetSetup />,
    "Targets": <ManageTargets />,
    "Appraisals": <Appraisal />,
    // "Settings": <Settings />,
    // "Reports": <Reports />,
  };

  return (
    <div className="flex bg-[#E3EDF9]">
      <div className="my-4 mx-4 flex-1 rounded-lg">
        <div className="mb-3">
          <h1 className="text-xl font-semibold">Performance Management</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`px-6 py-3 rounded-full text-sm font-medium ${
                item === activeTab
                  ? "bg-[#FFC107] text-black"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="mt-6 p-8 bg-white rounded-lg shadow-md">
          {components[activeTab] || <div>Content not found for the selected tab.</div>}
        </div>
      </div>
    </div>
  );
};

export default PerformanceManagement;
