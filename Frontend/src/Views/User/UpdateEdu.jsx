// // import React from "react";
// // import { useForm } from "react-hook-form";

// // const UpdateAcademicDetailsForm = ({ onSubmit }) => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm();

// //   const handleFormSubmit = (data) => {
// //     onSubmit(data); // Pass data to the parent component
// //   };

// //   return (
// //     <div className="h-[80vh] flex justify-center">
// //       <form
// //         onSubmit={handleSubmit(handleFormSubmit)}
// //         className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full"
// //       >
// //         <h2 className="text-2xl font-semibold mb-4 text-gray-800">
// //           Update Academic Details
// //         </h2>

// //         <div className="grid grid-cols-2 gap-4">
// //           {/* Institution */}
// //           <div>
// //             <label className="block text-gray-700 mb-1" htmlFor="institution">
// //               Name of Institution
// //             </label>
// //             <input
// //               {...register("institution", {
// //                 required: "Institution is required",
// //               })}
// //               id="institution"
// //               type="text"
// //               placeholder="Enter Institution Name"
// //               className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
// //             />
// //             {errors.institution && (
// //               <p className="text-red-500 text-sm mt-1">
// //                 {errors.institution.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* Course */}
// //           <div>
// //             <label className="block text-gray-700 mb-1" htmlFor="course">
// //               Course
// //             </label>
// //             <input
// //               {...register("course", { required: "Course is required" })}
// //               id="course"
// //               type="text"
// //               placeholder="Enter Course Name"
// //               className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
// //             />
// //             {errors.course && (
// //               <p className="text-red-500 text-sm mt-1">
// //                 {errors.course.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* Department */}
// //           <div>
// //             <label className="block text-gray-700 mb-1" htmlFor="department">
// //               Department
// //             </label>
// //             <input
// //               {...register("department", {
// //                 required: "Department is required",
// //               })}
// //               id="department"
// //               type="text"
// //               placeholder="Enter Department Name"
// //               className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
// //             />
// //             {errors.department && (
// //               <p className="text-red-500 text-sm mt-1">
// //                 {errors.department.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* Location */}
// //           <div>
// //             <label className="block text-gray-700 mb-1" htmlFor="location">
// //               Location
// //             </label>
// //             <input
// //               {...register("location", { required: "Location is required" })}
// //               id="location"
// //               type="text"
// //               placeholder="Enter Location"
// //               className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
// //             />
// //             {errors.location && (
// //               <p className="text-red-500 text-sm mt-1">
// //                 {errors.location.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* Start Date */}
// //           <div>
// //             <label className="block text-gray-700 mb-1" htmlFor="startDate">
// //               Start Date
// //             </label>
// //             <input
// //               {...register("startDate", { required: "Start Date is required" })}
// //               id="startDate"
// //               type="date"
// //               className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
// //             />
// //             {errors.startDate && (
// //               <p className="text-red-500 text-sm mt-1">
// //                 {errors.startDate.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* End Date */}
// //           <div>
// //             <label className="block text-gray-700 mb-1" htmlFor="endDate">
// //               End Date
// //             </label>
// //             <input
// //               {...register("endDate", { required: "End Date is required" })}
// //               id="endDate"
// //               type="date"
// //               className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
// //             />
// //             {errors.endDate && (
// //               <p className="text-red-500 text-sm mt-1">
// //                 {errors.endDate.message}
// //               </p>
// //             )}
// //           </div>
// //            {/* Description */}
// //           <div>
// //             <label className="block text-gray-700 mb-1" htmlFor="description">
// //               Description
// //             </label>
// //             <textarea
// //               {...register("description", {
// //                 required: "Description is required",
// //               })}
// //               id="description"
// //               placeholder="Enter Description"
// //               className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
// //             />
// //             {errors.description && (
// //               <p className="text-red-500 text-sm mt-1">
// //                 {errors.description.message}
// //               </p>
// //             )}
// //           </div>
// //         </div>

// //         <div className="mt-6 flex justify-end">
// //           <button
// //             type="submit"
// //             className="bg-[#28A745] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#218838] focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
// //           >
// //             Submit
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UpdateAcademicDetailsForm;




// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";


// const UpdateAcademicDetailsForm = () => {
//   const [academicDetails, setAcademicDetails] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [currentDetail, setCurrentDetail] = useState(null);
//   const [message, setMessage] = useState("");

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   useEffect(() => {
//     fetchAcademicDetails();
//   }, []);

//   const fetchAcademicDetails = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.get("http://localhost:5000/get-user-data", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(response);

//       const records = response.data.educationDetails?.academicRecords || [];
//       setAcademicDetails(records);
//     } catch (error) {
//       console.error("Error fetching academic details:", error);
//     }
//   };

//   const handleAddClick = () => {
//     setMessage("");
//     setCurrentDetail({ institute: "", course: "", department: "", location: "", startDate: "", endDate: "", description: "" });
//     setShowForm(true);
//   };

//   const handleUpdateClick = (detail) => {
//     setCurrentDetail({ ...detail });
//     setShowForm(true);
//   };

//   const handleSave = async (data) => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setMessage("❌ Authentication error. Please log in again.");
//       return;
//     }

//     try {
//       if (currentDetail?._id) {
//         console.log("🟢 Sending PUT request for update:", currentDetail);
//         const userId = localStorage.getItem("userId");
//         const response = await axios.put(
//           `http://localhost:5000/users/update/${userId}/academic/${currentDetail._id}`,
//           data,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setAcademicDetails(prev => prev.map(item => item._id === response.data.updatedAcademic._id ? response.data.updatedAcademic : item));
//         setMessage("✅ Academic details updated successfully!");
//         console.log(response);
//       } else {
//         const response = await axios.post(
//           "http://localhost:5000/users/add-academic",
//           data,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log(response);
//         setAcademicDetails(prev => [...prev, response.data.educationDetails]);
//         setMessage("✅ Academic details added successfully!");
//       }
//       setShowForm(false);
//       reset();
//     } catch (error) {
//       console.error("❌ Error saving academic details:", error);
//       setMessage(error.response?.data?.message || "❌ Error saving academic details. Please try again.");
//     }
//   };

//   return (
//     <div className="flex-1 rounded-lg bg-[#E3EDF9] p-6">
//       <div className="max-w-2xl bg-white rounded-lg p-6 space-y-6 shadow-lg">
//         <h2 className="text-xl font-semibold text-gray-800">Academic Details</h2>
//         {message && <p className="text-red-500 text-sm">{message}</p>}

//         {!showForm ? (
//           <>
//             <div className="space-y-4">
//               {academicDetails.length > 0 ? (
//                 academicDetails.map((detail, index) => (
//                   <div key={detail._id || `temp-${index}`} className="bg-[#F6F9FC] p-4 rounded-lg shadow flex justify-between items-center">
//                     <div>
//                       <h3 className="font-medium">{detail.institute}</h3>
//                       <p className="text-sm text-gray-600"><strong>Course:</strong> {detail.course}</p>
//                       <p className="text-sm text-gray-600"><strong>Department:</strong> {detail.department}</p>
//                       <p className="text-sm text-gray-600"><strong>Location:</strong> {detail.location}</p>
//                       <p className="text-sm text-gray-600"><strong>Duration:</strong> {detail.startDate} - {detail.endDate}</p>
//                     </div>
//                     <button onClick={() => handleUpdateClick(detail)} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
//                       Update
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No academic details found.</p>
//               )}
//             </div>
//             <div className="mt-6">
//               <button onClick={handleAddClick} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
//                 Add Academic Details
//               </button>
//             </div>
//           </>
//         ) : (
//           <form onSubmit={handleSubmit(handleSave)} className="bg-[#F6F9FC] p-6 rounded-lg shadow">
//             <h3 className="text-lg font-medium mb-4">{currentDetail?._id ? "Update Academic Details" : "Add Academic Details"}</h3>
//             <div className="space-y-3">
//               {Object.keys(currentDetail).map((field) => (
//                 field !== "_id" && (
//                   <div key={field}>
//                     <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                     <input
//                       {...register(field, { required: `${field} is required` })}
//                       type={field.includes("Date") ? "date" : "text"}
//                       defaultValue={currentDetail[field] || ""}
//                       placeholder={`Enter ${field}`}
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                     {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>}
//                   </div>
//                 )
//               ))}
//             </div>
//             <div className="mt-4 flex gap-4">
//               <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600">Save</button>
//               <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-500">Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateAcademicDetailsForm;


import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdateDetailsForm = ({ type }) => {
  const [details, setDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/get-user-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);

      const records = type === "academic" ? response.data.educationDetails?.academicRecords || [] 
                                          : response.data.educationDetails?.professionalDetails || [];
      setDetails(records);
      console.log(records);
    } catch (error) {
      console.error(`Error fetching ${type} details:`, error);
    }
  };

  const handleAddClick = () => {
    setMessage("");
    setCurrentDetail(type === "academic"
      ? { institute: "", course: "", department: "", location: "", startDate: "", endDate: "", description: "" }
      : { title: "", institute: "", location: "", startDate: "", endDate: "", description: "" }
    );
    setShowForm(true);
  };

  const handleUpdateClick = (detail) => {
    setCurrentDetail({ ...detail });
    setShowForm(true);
  };

  const handleSave = async (data) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("❌ Authentication error. Please log in again.");
      return;
    }

    try {
      if (currentDetail?._id) {
        console.log(`🟢 Sending PUT request for ${type} update:`, currentDetail);
        const userId = localStorage.getItem("userId");
        const endpoint = type === "academic" 
          ? `http://localhost:5000/users/update/${userId}/academic/${currentDetail._id}`
          : `http://localhost:5000/users/update/${userId}/professional/${currentDetail._id}`;

        const response = await axios.put(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });

        setDetails(prev => prev.map(item => item._id === response.data.updatedRecord._id ? response.data.updatedRecord : item));
        setMessage(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} details updated successfully!`);
      } else {
        const endpoint = type === "academic" 
          ? "http://localhost:5000/users/add-academic"
          : "http://localhost:5000/users/add-professional";

        const response = await axios.post(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });
        
        setDetails(prev => [...prev, response.data.educationDetails]);
        setMessage(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} details added successfully!`);
      }
      setShowForm(false);
      reset();
    } catch (error) {
      console.error(`❌ Error saving ${type} details:`, error);
      setMessage(error.response?.data?.message || `❌ Error saving ${type} details. Please try again.`);
    }
  };

  return (
    <div className="flex-1 rounded-lg bg-[#E3EDF9] p-6">
      <div className="max-w-2xl bg-white rounded-lg p-6 space-y-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">
          {type === "academic" ? "Academic Details" : "Professional Qualifications"}
        </h2>
        {message && <p className="text-red-500 text-sm">{message}</p>}

        {!showForm ? (
          <>
            <div className="space-y-4">
              {details.length > 0 ? (
                details.map((detail, index) => (
                  <div key={detail._id || `temp-${index}`} className="bg-[#F6F9FC] p-4 rounded-lg shadow flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{type === "academic" ? detail.institute : detail.title}</h3>
                      {type === "academic" ? (
                        <>
                          <p className="text-sm text-gray-600"><strong>Course:</strong> {detail.course}</p>
                          <p className="text-sm text-gray-600"><strong>Department:</strong> {detail.department}</p>
                          <p className="text-sm text-gray-600"><strong>Location:</strong> {detail.location}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600"><strong>Institute:</strong> {detail.institute}</p>
                      )}
                      <p className="text-sm text-gray-600"><strong>Duration:</strong> {detail.startDate} - {detail.endDate}</p>
                      <p className="text-sm text-gray-600"><strong>Description:</strong> {detail.description}</p>
                    </div>
                    <button onClick={() => handleUpdateClick(detail)} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No {type} details found.</p>
              )}
            </div>
            <div className="mt-6">
              <button onClick={handleAddClick} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
                Add {type === "academic" ? "Academic Details" : "Professional Qualification"}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit(handleSave)} className="bg-[#F6F9FC] p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">{currentDetail?._id ? "Update" : "Add"} {type.charAt(0).toUpperCase() + type.slice(1)} Details</h3>
            <div className="space-y-3">
              {Object.keys(currentDetail).map((field) => (
                field !== "_id" && (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      {...register(field, { required: `${field} is required` })}
                      type={field.includes("Date") ? "date" : "text"}
                      defaultValue={currentDetail[field] || ""}
                      placeholder={`Enter ${field}`}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>}
                  </div>
                )
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600">Save</button>
              <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-500">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateDetailsForm;

