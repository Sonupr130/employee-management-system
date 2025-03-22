import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ employee, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    department: employee.department,
    jobTitle: employee.jobTitle,
    startDate: employee.startDate,
    category: employee.category,
    gender: employee.gender,
    // Add other fields as necessary
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return ''; // Return an empty string if the dateString is invalid
    }

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return ''; // Return an empty string if the date is invalid
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed

    return `${year}-${month}-${day}`; // Returns date in YYYY-MM-DD format
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the startDate to YYYY-MM-DD
    const formattedStartDate = formatDate(formData.startDate);

    // Include the employee ID and formatted startDate in the updated data
    onSave({ ...formData, startDate: formattedStartDate, _id: employee._id });
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Edit Employee Profile</h2>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 py-2 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="mt-1 block border py-2 px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                name="startDate"
                type="date"
                value={formatDate(formData.startDate)}
                onChange={handleChange}
                className="mt-1 border py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department || ""}
                onChange={handleChange}
                className="mt-1 border py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle || ""}
                onChange={handleChange}
                className="mt-1 border py-2 px-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="mt-1 border block py-2 px-3 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Full-time">Full Time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfile;