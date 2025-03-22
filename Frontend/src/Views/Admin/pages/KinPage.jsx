import React from 'react';

const NextOfKinDetails = ({employee}) => {


  return (
      <div className="flex-1 p-8 relative">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Name and Job Row */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Next of kin name</label>
              <input
                type="text"
                className="w-full p-3 bg-[#F1F4FA] rounded-lg select-none pointer-events-none"
                value={employee.nextDetails.kinName}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job / Occupation</label>
              <input
                type="text"
                className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                value={employee.nextDetails.occupation}
                readOnly
              />
            </div>
          </div>

          {/* Phone and Relationship Row */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                value={employee.nextDetails.phone}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 bg-[#F1F4FA] rounded-lg pr-10"
                  value={employee.nextDetails.relationship}
                  readOnly
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2"></span>
              </div>
            </div>
          </div>

          {/* Residential Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address</label>
            <input
              type="text"
              className="w-full p-3 bg-[#F1F4FA] rounded-lg"
              value={employee.nextDetails.address}
              readOnly
            />
          </div>
        </div>
      </div>
  );
};

export default NextOfKinDetails;
