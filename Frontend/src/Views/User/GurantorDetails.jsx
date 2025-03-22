

import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateGuarantorForm from "./UpdateGuarantorForm";

const GuarantorDetails = () => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [guarantorDetails, setGuarantorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // For displaying error messages

  // Fetch guarantor details
  useEffect(() => {
    const fetchGuarantorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token before request:", token); // Debugging: Check if token exists

        if (!token) {
          setMessage("No token found. Please log in again.");
          return;
        }

        const { data } = await axios.get("http://localhost:5000/get-user-data", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request
            "Content-Type": "application/json",
          },
        });

        setGuarantorDetails(data.guarantorDetails || {}); // Update state
        console.log("Guarantor Details Fetched:", data.guarantorDetails);
      } catch (error) {
        console.error(
          "Error fetching guarantor details:",
          error.response?.data?.message || error.message
        );
        setMessage("Failed to fetch guarantor details. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuarantorDetails();
  }, []);

  // Handle form submission to update guarantor details
  // const handleUpdateGuarantorDetails = async (newDetails) => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const userId = localStorage.getItem("userId");

  //     if (!token) {
  //       setMessage("Unauthorized: No token found. Please log in again.");
  //       return;
  //     }

  //     if (!userId) {
  //       setMessage("User ID not found. Please log in again.");
  //       return;
  //     }

  //     const { data } = await axios.put(
  //       `http://localhost:5000/users/update-guarantor/${userId}`,
  //       { guarantorDetails: newDetails },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include token for authentication
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     setGuarantorDetails(newDetails); // Update UI
  //     setShowUpdateForm(false);
  //     setMessage("Guarantor details updated successfully!");
  //   } catch (error) {
  //     console.error(
  //       "Error updating guarantor details:",
  //       error.response?.data?.message || error.message
  //     );
  //     setMessage("Failed to update guarantor details.");
  //   }
  // };

  const handleUpdateGuarantorDetails = async (newDetails) => {
    if (!newDetails) {
      setShowUpdateForm(false);
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
  
      if (!token) {
        setMessage("Unauthorized: No token found. Please log in again.");
        return;
      }
  
      if (!userId) {
        setMessage("User ID not found. Please log in again.");
        return;
      }
  
      console.log("Updating with data:", newDetails); // Debugging: See if form data is correct
  
      const { data } = await axios.put(
        `http://localhost:5000/users/update-guarantor/${userId}`,
        { guarantorDetails: newDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("API Response:", data);
  
      setGuarantorDetails(newDetails); // Update UI state
      setShowUpdateForm(false);
      setMessage("Guarantor details updated successfully!");
    } catch (error) {
      console.error(
        "Error updating guarantor details:",
        error.response?.data?.message || error.message
      );
      setMessage("Failed to update guarantor details.");
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 rounded-lg bg-[#E3EDF9] ">
      {message && <p className="text-red-600">{message}</p>} {/* Display messages */}
      {showUpdateForm ? (
        <UpdateGuarantorForm
          initialData={guarantorDetails}
          onSubmit={handleUpdateGuarantorDetails}
        />
      ) : (
        <div className="max-w-2xl bg-white rounded-lg p-6 space-y-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Guarantor Details</h2>
            <button
              onClick={() => setShowUpdateForm(true)}
              className="bg-[#28A745] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#218838] focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Update
            </button>
          </div>

          <div className="space-y-4 mt-4">
            {guarantorDetails?.name ? (
              <div className="bg-[#F6F9FC] p-4 rounded-lg shadow">
                <h3 className="font-medium">{guarantorDetails.name}</h3>
                <p className="text-sm text-gray-600">{guarantorDetails.position}</p>
                <p className="text-sm text-gray-600">{guarantorDetails.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No guarantor details available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuarantorDetails;
