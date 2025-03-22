import React, { useState } from "react";

const FinancialDetails = ({employee}) => {


  if (!employee) {
    console.log("No Employee Data Found:", employee);
    return <div className="text-red-500">Error: No Employee Data Available</div>;
  }



  return (
            <div className="flex-1 bg-white rounded-lg p-8">
              <div className="max-w-3xl">
                <h2 className="text-xl font-medium mb-6">Financial Details</h2>

                <div className="space-y-6">
                  {/* Bank Name */}
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={employee.bankDetails[0]?.bankName || ""}
                      className="w-full p-3 border rounded-lg bg-gray-100"
                      readOnly
                    />
                  </div>

                  {/* Account Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Account No
                      </label>
                      <input
                        type="text"
                        value={employee.bankDetails[0]?.accountNumber || ""}
                        className="w-full p-3 border rounded-lg bg-gray-100"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Account Name
                      </label>
                      <input
                        type="text"
                        value={employee.bankDetails[0]?.accountName || ""}
                        className="w-full p-3 border rounded-lg bg-gray-100"
                        readOnly
                      />
                    </div>
                  </div>

                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        value={employee.bankDetails[0]?.ifscCode || ""}
                        className="w-full p-3 border rounded-lg bg-gray-100"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Account Type
                      </label>
                      <input
                        type="text"
                        value={employee.bankDetails[0]?.accountType || ""}
                        className="w-full p-3 border rounded-lg bg-gray-100"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  )
};

export default FinancialDetails;
