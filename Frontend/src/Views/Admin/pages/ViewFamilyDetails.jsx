import React from "react";


const ViewFamilyDetails = ({employee}) => {
  if (!employee) {
    console.log("No Employee Data Found:", employee);
    return <div className="text-red-500">Error: No Employee Data Available</div>;
  }

  return (
            <div className="flex-1 bg-white rounded-lg p-8">
              <div className="max-w-3xl">
                <h2 className="text-xl font-medium mb-6">View Family Details</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Full Name */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="bg-[#F1F4FA] p-4 rounded-lg">
                        {employee.familyDetails[0]?.name || "Not Available"}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Phone No
                      </label>
                      <div className="bg-[#F1F4FA] p-4 rounded-lg">
                      {employee.familyDetails[0]?.phone || "Not Available"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Relationship */}
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Relationship
                      </label>
                      <div className="bg-[#F1F4FA] p-4 rounded-lg">{employee.familyDetails[0]?.relationship || "Not Available"}</div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="bg-[#F1F4FA] p-4 rounded-lg">
                    {employee.familyDetails[0]?.address || "Not Available"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default ViewFamilyDetails;
