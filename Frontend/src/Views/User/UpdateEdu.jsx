import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../../../config.js";

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
      // const response = await axios.get("http://localhost:5000/get-user-data", {
      const response = await axios.get(`${config.backendUrl}/get-user-data`, {
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
          // ? `http://localhost:5000/users/update/${userId}/academic/${currentDetail._id}`
          // : `http://localhost:5000/users/update/${userId}/professional/${currentDetail._id}`;
          ? `${config.backendUrl}/users/update/${userId}/academic/${currentDetail._id}`
          : `${config.backendUrl}/users/update/${userId}/professional/${currentDetail._id}`;

        const response = await axios.put(endpoint, data, { headers: { Authorization: `Bearer ${token}` } });

        setDetails(prev => prev.map(item => item._id === response.data.updatedRecord._id ? response.data.updatedRecord : item));
        setMessage(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} details updated successfully!`);
      } else {
        const endpoint = type === "academic" 
          // ? "http://localhost:5000/users/add-academic"
          // : "http://localhost:5000/users/add-professional";
          ? `${config.backendUrl}/users/add-academic`
          : `${config.backendUrl}/users/add-professional`;

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

