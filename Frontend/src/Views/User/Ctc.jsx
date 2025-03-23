import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config.js";

const Ctc = () => {
  // State to manage input values
  const [formValues, setFormValues] = useState({
    phone: "",
    phone2: "",
    email: "",
    state: "",
    city: "",
    address: "",
  });

  // State to toggle input fields' disabled state
  const [isEditable, setIsEditable] = useState(false);

  // State for success or error messages
  const [message, setMessage] = useState("");

  // Fetch existing contact details from the backend
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("Token before request:", token); 
  
        if (!token) {
          setMessage("No token found. Please log in again.");
          return;
        }
  
        // const { data } = await axios.get("http://localhost:5000/get-user-data", {
        const { data } = await axios.get(`${config.backendUrl}/get-user-data`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request
          },
        });
  
        setFormValues({
          phone: data.phone || "",
          phone2: data.phone2 || "",
          email: data.email || "",
          state: data.state || "",
          city: data.city || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error("Error fetching contact details:", error);
        setMessage("Failed to fetch contact details. Please log in again.");
      }
    };
  
    fetchContactDetails();
  }, []);
  
  

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      const userId = localStorage.getItem("userId"); // Retrieve user ID stored after login
  
      if (!token) {
        setMessage("Unauthorized: No token found. Please login again.");
        return;
      }
  
      if (!userId) {
        setMessage("User ID not found. Please login again.");
        return;
      }
  
      const { data } = await axios.put(
        // `http://localhost:5000/users/update-contact/${userId}`, 
       `${config.backendUrl}/users/update-contact/${userId}`, 
        formValues,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Include token for authentication
            "Content-Type": "application/json",
          },
        }
      );
  
      setMessage("Contact details updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating contact details:", error);
      setMessage("Failed to update contact details.");
    }
  };
  

  return (
    <div>
      <div className="max-w-full w-full px-10 mx-auto bg-white rounded-lg p-6 space-y-8 shadow-lg">
        {message && <p className="text-center text-lg text-green-600">{message}</p>}

        <form>
          <div className="grid grid-cols-2 gap-6">
            {/* Phone Number 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number 1</label>
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

            {/* Phone Number 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number 2</label>
              <input
                type="text"
                name="phone2"
                value={formValues.phone2}
                disabled={!isEditable}
                onChange={handleChange}
                className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                  isEditable ? "bg-white" : "bg-[#F6F9FC]"
                } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>

            {/* E-mail Address */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">E-mail Address</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                disabled={!isEditable}
                onChange={handleChange}
                className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                  isEditable ? "bg-white" : "bg-[#F6F9FC]"
                } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>

            {/* State of Residence */}
            <div>
              <label className="block text-sm font-medium text-gray-700">State of Residence</label>
              <input
                type="text"
                name="state"
                value={formValues.state}
                disabled={!isEditable}
                onChange={handleChange}
                className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                  isEditable ? "bg-white" : "bg-[#F6F9FC]"
                } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formValues.city}
                disabled={!isEditable}
                onChange={handleChange}
                className={`px-2 py-4 mt-2 block w-full rounded-md border-gray-300 ${
                  isEditable ? "bg-white" : "bg-[#F6F9FC]"
                } shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
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
    </div>
  );
};

export default Ctc;
