import config from "../../../../config.js";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PersonalDetails = ({ employee }) => {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        if (!employee || !employee._id) return;
         console.log(employee);
        const response = await axios.get(
          // `http://localhost:5000/profile-image/${employee._id}`
          `${config.backendUrl}/profile-image/${employee._id}`
        );

        if (response.data.imageUrl) {
          setProfilePic(response.data.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePic();
  }, [employee]);


  return (
    <div className="flex justify-center items-center">
      <div className="p-8 w-full max-w-md">
        <div className="relative">

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-yellow-400 overflow-hidden">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Employee avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <div className="space-y-6 w-full">
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Employee Name</p>
                <h1 className="text-xl font-semibold">
                  {employee.firstName} {employee.lastName}
                </h1>
              </div>

              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Department</p>
                <p className="text-lg font-medium">{employee.department}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">Job Title</p>
                  <p className="text-lg font-medium">{employee.jobTitle}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-gray-600 text-sm">Job Category</p>
                  <p className="text-lg font-medium">{employee.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;