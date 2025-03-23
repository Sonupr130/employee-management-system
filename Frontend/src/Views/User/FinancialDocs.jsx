import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config.js";
const FinancialDocs = () => {
  const [bankDetails, setBankDetails] = useState([
    {
      accountNumber: "000101001",
      accountName: "John Doe",
      bankName: "GTBank",
      accountType: "Savings",
      ifscCode:"GTOUTDB",
    },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      // const response = await axios.get("http://localhost:5000/get-user-data", {
      const response = await axios.get(`${config.backendUrl}/get-user-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBankDetails(response.data.bankDetails || []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };

  const handleAddClick = () => {
    setCurrentDetail({ accountName: "", accountNumber: "", bankName: "", ifscCode:"", accountType: "Savings" });
    setShowForm(true);
  };

  const handleUpdateClick = (detail) => {
    setCurrentDetail(detail);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDetail((prev) => ({ ...prev, [name]: value }));
  };


  // const handleSave = async () => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  
  //     if (currentDetail._id) {
  //       // Updating existing entry
  //       await axios.put(`http://localhost:5000/users/add-bankinfo/update/${currentDetail._id}`, currentDetail, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  
  //       setBankDetails((prevDetails) =>
  //         prevDetails.map((detail) => (detail._id === currentDetail._id ? currentDetail : detail))
  //       );
  //     } else {
  //       // Adding a new entry, ensure it has a unique _id
  //       // const response = await axios.post(`http://localhost:5000/users/add-bankinfo/${currentDetail._id}`, currentDetail, {
  //         const response = await axios.post(`http://localhost:5000/users/add-bankinfo`, currentDetail, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       console.log(response);
  
  //       const newBankDetail = response.data.user.bankDetails.at(-1);
  //       setBankDetails((prevDetails) => [...prevDetails, { ...newBankDetail, _id: newBankDetail._id || Date.now().toString() }]);
  //     }
  
  //     setShowForm(false);
  //     setCurrentDetail(null);
  //   } catch (error) {
  //     console.error("Error saving bankDetails:", error);
  //   }
  // };
  
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
  
      if (currentDetail._id) {
        // Updating existing entry
        // await axios.put(`http://localhost:5000/users/add-bankinfo/update/${currentDetail._id}`, currentDetail, {
        await axios.put(`${config.backendUrl}/users/add-bankinfo/update/${currentDetail._id}`, currentDetail, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setBankDetails((prevDetails) =>
          prevDetails.map((detail) => (detail._id === currentDetail._id ? currentDetail : detail))
        );
      } else {
        // Adding a new entry, REMOVE _id from the URL
        // const response = await axios.post(`http://localhost:5000/users/add-bankinfo`, currentDetail, {
        const response = await axios.post(`${config.backendUrl}/users/add-bankinfo`, currentDetail, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log(response);
  
        // Get the newly added bank detail from the response
        const newBankDetail = response.data.user.bankDetails.at(-1);
  
        setBankDetails((prevDetails) => [
          ...prevDetails,
          { ...newBankDetail, _id: newBankDetail._id || Date.now().toString() },
        ]);
      }
  
      setShowForm(false);
      setCurrentDetail(null);
    } catch (error) {
      console.error("Error saving bankDetails:", error);
    }
  };
  


  return (
    <div className="flex-1 rounded-lg bg-[#E3EDF9] ">
      <div className="max-w-2xl bg-white rounded-lg p-6 space-y-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Details</h2>

        {!showForm ? (
          <>
            <div className="space-y-4">
              {bankDetails.map((detail) => (
                <div key={detail._id || detail.accountNumber} className="bg-[#F6F9FC] p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{detail.accountName}</h3>
                    <p className="text-sm text-gray-600"><strong>Bank Name:</strong> {detail.bankName}</p>
                    <p className="text-sm text-gray-600"><strong>Account Number:</strong> {detail.accountNumber}</p>
                    <p className="text-sm text-gray-600"><strong>IFSC Code:</strong> {detail.ifscCode}</p>
                    <p className="text-sm text-gray-600"><strong>Account Type:</strong> {detail.accountType}</p>
                  </div>
                  <button onClick={() => handleUpdateClick(detail)} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
                    Update
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <button onClick={handleAddClick} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
                Add Bank Details
              </button>
            </div>
          </>
        ) : (
          <div className="bg-[#F6F9FC] p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">
              {currentDetail.accountNumber ? "Update Bank Details" : "Add Bank Details"}
            </h3>
            <div className="space-y-3">
              {['accountNumber', 'accountName', 'bankName', 'ifscCode'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={currentDetail[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field}`}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Type</label>
                <select
                  name="accountType"
                  value={currentDetail.accountType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialDocs;
