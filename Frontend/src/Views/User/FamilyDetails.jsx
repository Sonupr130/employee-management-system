

import React, { useState, useEffect } from "react";
import axios from "axios";

const FamilyDetails = () => {
  const [family, setFamily] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [message, setMessage] = useState(""); // ✅ Message for feedback

  useEffect(() => {
    fetchFamilyDetails();
  }, []);

  const fetchFamilyDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/get-user-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Family Data:", response.data.familyDetails); 
      setFamily(response.data.familyDetails || []);
    } catch (error) {
      console.error("Error fetching family details:", error);
    }
  };

  const handleAddClick = () => {
    if (family.length >= 3) {
      setMessage("❌ You can only add up to 3 family members.");
      return;
    }
    setMessage("");
    setCurrentMember({ name: "", relationship: "", phone: "", address: "" }); // ✅ Ensures object is always initialized
    setShowForm(true);
  };
  

  const handleUpdateClick = (member) => {
    if (!member || !member._id) {
      console.error("🚨 Error: Member data is missing!");
      return;
    }
    setCurrentMember({ ...member }); // ✅ Ensures valid object is set
    setShowForm(true);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Current Member Before Sending:", currentMember);
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("❌ Authentication error. Please log in again.");
      return;
    }
  
    try {
      if (currentMember._id) {
        // 🔄 UPDATE (PUT) existing family member
        console.log("🟢 Sending PUT request for update:", currentMember);
        const userId = localStorage.getItem("userId");
        const response = await axios.put(
          `http://localhost:5000/users/update/${userId}/family/${currentMember._id}`,
          currentMember,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
  
        const updatedMember = response.data.updatedFamilyMember;
        setFamily((prevFamily) =>
          prevFamily.map((member) =>
            member._id === updatedMember._id ? updatedMember : member
          )
        );
        setMessage("✅ Family member updated successfully!");
      } else {
        // 🆕 CREATE (POST) a new family member
        console.log("🟢 Sending POST request to add new member:", currentMember);
  
        const response = await axios.post(
          "http://localhost:5000/users/add",
          currentMember,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        setFamily((prevFamily) => [...prevFamily, response.data.newFamilyMember]);
        setMessage("✅ Family member added successfully!");
      }
  
      setShowForm(false);
      setCurrentMember(null);
    } catch (error) {
      console.error("❌ Error saving family member:", error);
      setMessage(error.response?.data?.message || "❌ Error saving family member. Please try again.");
    }
  };
  

  return (
    <div className="flex-1 rounded-lg bg-[#E3EDF9] ">
      <div className="max-w-2xl bg-white rounded-lg p-6 space-y-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Family Details
        </h2>

        {message && <p className="text-red-500 text-sm">{message}</p>} 

        {!showForm ? (
          <>
            <div className="space-y-4">
              {family?.length > 0 ? (
                family.map((member, index) =>
                  member ? (
                    <div
                      key={member._id || `temp-${index}`}
                      className="bg-[#F6F9FC] p-4 rounded-lg shadow flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-600">
                          <strong>Relationship:</strong> {member.relationship}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Phone No:</strong> {member.phone}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Address:</strong> {member.address}
                        </p>
                      </div>
                      <button
                        onClick={() => handleUpdateClick(member)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
                      >
                        Update
                      </button>
                    </div>
                  ) : null
                )
              ) : (
                <p className="text-gray-500">No family members found.</p>
              )}
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddClick}
                disabled={family.length >= 3} 
                className={`px-6 py-3 rounded-lg shadow-md ${
                  family.length >= 3
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Add Family Member
              </button>
            </div>
          </>
        ) : (
          <div className="bg-[#F6F9FC] p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">
              {currentMember?._id
                ? "Update Family Member"
                : "Add Family Member"}
            </h3>
            <div className="space-y-3">
              {["name", "relationship", "phone", "address"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={currentMember ? currentMember[field] || "" : ""}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field}`}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyDetails;

