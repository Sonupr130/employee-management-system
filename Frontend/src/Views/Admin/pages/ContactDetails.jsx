import React, { useState } from "react";
import { PencilLine } from "lucide-react";

const ContactDetails = ({employee}) => {
  const menuItems = [
    "Personal Details",
    "Contact Details",
    "Next of kin Details",
    "Education/Qualifications",
    "Guarantor Details",
    "Family Details",
    "Job Details",
    "Financial Details",
  ];

  const [activeTab, setActiveTab] = useState("Contact Details");

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 rounded-lg p-8 relative">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Phone Numbers */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number 1
              </label>
              <input
                type="tel"
                className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                value={employee.phone} 
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number 2
              </label>
              <input
                type="tel"
                className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                value={employee.phone2} 
                readOnly
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail Address
            </label>
            <input
              type="email"
              className="w-full p-3 bg-[#F1F4FA] rounded-lg"
              value={employee.email} 
              readOnly
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State of residence
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                value={employee.state} 
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                className="w-full p-3 bg-[#F1F4FA] rounded-lg"
                value={employee.state} 
                readOnly
              />
            </div>
          </div>

          {/* Residential Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Residential Address
            </label>
            <input
              type="text"
              className="w-full p-3 bg-[#F1F4FA] rounded-lg"
              value={employee.address} 
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ContactDetails = ({ userId, employee }) => {

//   if (!employee) {
//     console.log("No Employee Data Found:", employee);
//     return <div className="text-red-500">Error: No Employee Data Available</div>;
//   }

//   const [userData, setUserData] = useState({
//     phone: "",
//     email: "",
//     state: "",
//     city: "",
//     address: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/users/get-allusers`);
//         setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data", error);
//       }
//     };
//     console.log(fetchUserData);
//     fetchUserData();
//   }, [userId]);



//   return (
//     <div className="flex gap-6">

//       <div className="flex flex-col items-center text-center space-y-4">
//       <div className="space-y-1">
//               <p className="text-gray-600 text-sm">City</p>
//               <h1 className="text-xl font-semibold">{employee.firstName} {employee.lastName}</h1>
//             </div>

//           <div className="space-y-6 w-full">
//             <div className="space-y-1">
//               <p className="text-gray-600 text-sm">Phone Number</p>
//               <h1 className="text-xl font-semibold">{employee.firstName} {employee.lastName}</h1>
//             </div>

//             <div className="space-y-1">
//               <p className="text-gray-600 text-sm">E-mail Address</p>
//               <p className="text-lg font-medium">{employee.department}</p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-1">
//                 <p className="text-gray-600 text-sm">State of Residence</p>
//                 <p className="text-lg font-medium">{employee.jobTitle}</p>
//               </div>
              
//               <div className="space-y-1">
//                 <p className="text-gray-600 text-sm">Residential Address</p>
//                 <p className="text-lg font-medium">{employee.category}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// };

// export default ContactDetails;






