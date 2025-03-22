
import React, { useState, useEffect } from "react";
import { NotebookPen } from 'lucide-react';
import axios from "axios";

const EducationQualifications = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showProfessionalUpdateForm, setShowProfessionalUpdateForm] = useState(false);
  const [editingAcademicIndex, setEditingAcademicIndex] = useState(null);
  const [editingProfessionalIndex, setEditingProfessionalIndex] = useState(null);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [message, setMessage] = useState("");

  const [academicDetails, setAcademicDetails] = useState([]);
  const [professionalDetails, setProfessionalDetails] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/get-user-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setAcademicDetails(response.data.educationDetails.academicRecords);
      setProfessionalDetails(response.data.educationDetails.professionalDetails);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleUpdateAcademicDetails = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId"); 
    const recordId = currentDetail?._id; // Ensure `_id` is used
    console.log("Updating academic record ID:", recordId);
  
    try {
      if (recordId) {
        // Update existing record
        const response = await axios.put(
          `http://localhost:5000/users/update/${userId}/academic/${recordId}`,
          currentDetail,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.status === 200) {
          setAcademicDetails((prevDetails) =>
            prevDetails.map((detail) =>
              detail._id === recordId ? { ...detail, ...currentDetail } : detail
            )
          );
          setMessage("Academic details updated successfully.");
        }
      } else {
        // Add new record
        const response = await axios.post(
          `http://localhost:5000/users/add-academic/${userId}`,
          currentDetail,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.status === 201) {
          setAcademicDetails([...academicDetails, response.data]);
          setMessage("New academic record added successfully.");
        }
      }
    } catch (error) {
      console.error("Error saving academic details:", error);
    }
  
    setShowUpdateForm(false);
    setEditingAcademicIndex(null);
    setCurrentDetail(null);
  };
  
  
  
  

  const handleUpdateProfessionalDetails = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId"); 
    const recordId = currentDetail?._id; // Use `_id` properly
    console.log("Updating professional record ID:", recordId);
  
    try {
      if (recordId) {
        // Update existing professional record
        const response = await axios.put(
          `http://localhost:5000/users/update/${userId}/professional/${recordId}`,
          currentDetail,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.status === 200) {
          setProfessionalDetails((prevDetails) =>
            prevDetails.map((detail) =>
              detail._id === recordId ? { ...detail, ...currentDetail } : detail
            )
          );
          setMessage("Professional qualification updated successfully.");
        }
      } else {
        // Add new professional record
        const response = await axios.post(
          `http://localhost:5000/users/add-professional/${userId}`,
          currentDetail,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        if (response.status === 201) {
          setProfessionalDetails([...professionalDetails, response.data]);
          setMessage("New professional record added successfully.");
        }
      }
    } catch (error) {
      console.error("Error saving professional details:", error);
    }
  
    setShowProfessionalUpdateForm(false);
    setEditingProfessionalIndex(null);
    setCurrentDetail(null);
  };
  
  

  return (
    <div className="flex-1 rounded-lg bg-[#E3EDF9] ">
      {showUpdateForm ? (
        <div className="max-w-2xl bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4">Add / Edit Academic Details</h3>
          <form onSubmit={handleUpdateAcademicDetails} className="space-y-3">
            {["institute", "course", "department", "location", "startDate", "endDate", "description"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">{field}</label>
                <input
                  type={field.includes("Date") ? "date" : "text"}
                  value={currentDetail?.[field] || ""}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, [field]: e.target.value })}
                  placeholder={`Enter ${field}`}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
             

            ))}
            <div className="mt-4 flex gap-4">
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                Save
              </button>
              <button type="button" onClick={() => setShowUpdateForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : showProfessionalUpdateForm ? (
        <div className="max-w-2xl bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4">Add / Edit Professional Qualification</h3>
          <form onSubmit={handleUpdateProfessionalDetails} className="space-y-3">
            {["title", "institute", "location", "startDate", "endDate", "description"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">{field}</label>
                <input
                  type={field.includes("Date") ? "date" : "text"}
                  value={currentDetail?.[field] || ""}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, [field]: e.target.value })}
                  placeholder={`Enter ${field}`}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
            <div className="mt-4 flex gap-4">
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                Save
              </button>
              <button type="button" onClick={() => setShowProfessionalUpdateForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="max-w-2xl bg-white rounded-lg p-6 space-y-6 shadow-lg">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Academic Records</h2>
              <button
                onClick={() => {
                  setShowUpdateForm(true);
                  setCurrentDetail({
                    institute: "",
                    course: "",
                    department: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  });
                }}
                className="bg-[#28A745] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#218838]"
              >
                Add
              </button>
            </div>
            <div className="space-y-4 mt-4 max-h-60 overflow-y-auto">
              {academicDetails.map((detail, index) => (
                <div key={index} className="bg-[#F6F9FC] p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{detail.institute}</h3>
                    <p className="text-sm text-gray-600">{detail.course}, {detail.startDate} - {detail.endDate}</p>
                  </div>
                  <NotebookPen onClick={() => {
                    console.log("Editing acdemic record ID:", detail._id);
                    setEditingAcademicIndex(index);
                    setShowUpdateForm(true);
                    setCurrentDetail({...detail,_id: detail._id });
                  }} className="text-blue-600 cursor-pointer mr-8" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Professional Qualifications</h2>
              <button
                onClick={() => {
                  setShowProfessionalUpdateForm(true);
                  setCurrentDetail({
                    title: "",
                    institute: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  });
                }}
                className="bg-[#28A745] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#218838]"
              >
                Add
              </button>
            </div>
            <div className="space-y-4 mt-4 max-h-60 overflow-y-auto">
              {professionalDetails.map((detail, index) => (
                <div key={index} className="bg-[#F6F9FC] p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{detail.title}</h3>
                    <p className="text-sm text-gray-600">at {detail.institute}, {detail.startDate} - {detail.endDate}</p>
                  </div>
                  <NotebookPen onClick={() => {
                    console.log("Editing professional record ID:", detail._id);
                    setEditingProfessionalIndex(index);
                    setShowProfessionalUpdateForm(true);
                    setCurrentDetail({...detail,_id: detail._id });
                  }} className="text-blue-600 cursor-pointer mr-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationQualifications;

