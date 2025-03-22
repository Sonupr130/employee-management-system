import React, { useState } from "react";


const ViewGuarantorDetails = ({employee}) => {
  if (!employee) {
    console.log("No Employee Data Found:", employee);
    return <div className="text-red-500">Error: No Employee Data Available</div>;
  }

  

  return (
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
                      <p>{employee.guarantorDetails.name}</p>
                    </div>
                  </div>

                  {/* Job Title / Occupation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title / Occupation
                    </label>
                    <div className="bg-[#F1F4FA] p-4 rounded-lg">
                      <p>{employee.guarantorDetails.position}</p>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone No
                    </label>
                    <div className="bg-[#F1F4FA] p-4 rounded-lg">
                      <p>{employee.guarantorDetails.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default ViewGuarantorDetails;
