import React, { useState, useEffect } from "react";
import axios from "axios";

const NextDetails = () => {
  // State to manage input values
  const [formValues, setFormValues] = useState({
    kinName: "",
    occupation: "",
    phone: "",
    relationship: "",
    address: "",
  });

  // State to toggle input fields' disabled state
  const [isEditable, setIsEditable] = useState(false);

  // State for success or error messages
  const [message, setMessage] = useState("");

  // Fetch existing next-of-kin details from the backend
  useEffect(() => {
    const fetchNextDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("No token found. Please log in again.");
          return;
        }

        const { data } = await axios.get("http://localhost:5000/get-user-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

          setFormValues(data.nextDetails || {
            kinName: data.kinName || "",
            occupation: data.occupation || "",
            phone: data.phone || "",
            relationship: data.relationship || "",
            address: data.address || "",
          });
      } catch (error) {
        console.error("Error fetching next-of-kin details:", error);
        setMessage("Failed to fetch next-of-kin details. Please log in again.");
      }
    };

    fetchNextDetails();
  }, []);

  

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
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
  
      const requestBody = {
        nextDetails: formValues, // Wrap formValues inside nextDetails
      };
  
      const { data } = await axios.put(
        `http://localhost:5000/users/update-next-of-kin/${userId}`,
        requestBody, // Use the corrected request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log(data);
      setMessage("Next of Kin details updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating next-of-kin details:", error);
      setMessage("Failed to update next-of-kin details.");
    }
  };
  

  return (
    <div className="max-w-full w-full px-10 mx-auto bg-white rounded-lg p-6 space-y-8 shadow-lg">
      {message && <p className="text-center text-lg text-green-600">{message}</p>}
      <form>
        <div className="grid grid-cols-2 gap-6">
          {/* Next of Kin Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Next of Kin Name</label>
            <input
              type="text"
              name="kinName"
              value={formValues.kinName}
              disabled={!isEditable}
              onChange={handleChange}
              className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                isEditable ? "bg-white" : "bg-[#F6F9FC]"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>

          {/* Job/Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job / Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formValues.occupation}
              disabled={!isEditable}
              onChange={handleChange}
              className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                isEditable ? "bg-white" : "bg-[#F6F9FC]"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formValues.phone}
              disabled={!isEditable}
              onChange={handleChange}
              className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                isEditable ? "bg-white" : "bg-[#F6F9FC]"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship</label>
            <select
              name="relationship"
              value={formValues.relationship}
              disabled={!isEditable}
              onChange={handleChange}
              className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                isEditable ? "bg-white" : "bg-[#F6F9FC]"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            >
              <option value="Relative">Relative</option>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
            </select>
          </div>

          {/* Residential Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Residential Address</label>
            <textarea
              name="address"
              value={formValues.address}
              disabled={!isEditable}
              onChange={handleChange}
              className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                isEditable ? "bg-white" : "bg-[#F6F9FC]"
              } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              rows={3}
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            type="button"
            onClick={() => setIsEditable((prev) => !prev)}
            className={`px-8 py-3 rounded-lg shadow-md ${
              isEditable ? "bg-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isEditable ? "Cancel" : "Edit"}
          </button>

          {isEditable && (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NextDetails;
