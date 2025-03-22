import React, { useState, useEffect } from "react";
import axios from "axios";

const TargetSetup = () => {
  const [formData, setFormData] = useState({
    title: "",
    kpiWeight: "",
    description: "",
    employees: "",
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Separate state for error messages
  const [userList, setUserList] = useState([]); // List of all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered employees for dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch employees from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/get-allusers"); // Replace with your backend endpoint
        const users = response.data?.users || []; // Fallback for unexpected response format
        if (Array.isArray(users)) {
          setUserList(users); // Set user list
          setFilteredUsers(users); // Initially show all users
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching Users:", error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear specific field errors

    // Filter users based on input
    if (name === "employees") {
      clearTimeout(handleChange.debounceTimer); // Clear previous debounce timer
      handleChange.debounceTimer = setTimeout(() => {
        const filtered = userList.filter((user) =>
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered); // Update filtered list
        setDropdownVisible(true); // Show dropdown while typing
      }, 300); // Debounce for 300ms
    }
  };

  // Handle employee selection from dropdown
  const handleEmployeeSelect = (user) => {
    setFormData((prev) => ({
      ...prev,
      employees: `${user.firstName} ${user.lastName}`,
    }));
    setDropdownVisible(false); // Hide dropdown after selection
  };
  

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.kpiWeight) newErrors.kpiWeight = "KPI weight is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.employees) {
      newErrors.employees = "Employees are required.";
    } else if (
      !userList.some(
        (user) => `${user.firstName} ${user.lastName}` === formData.employees
      )
    ) {
      newErrors.employees = "Please select a valid employee.";
    }
    
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.endDate) newErrors.endDate = "End date is required.";
    if (formData.startDate > formData.endDate) {
      newErrors.endDate = "End date must be after the start date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const payload = {
        ...formData,
        userName: formData.employees, // Map employees to userName
      };
  
      const response = await axios.post("http://localhost:5000/kpi/create", payload);
      setSuccessMessage("Target created successfully!");
      setErrorMessage(""); // Clear error messages
      setFormData({
        title: "",
        kpiWeight: "",
        description: "",
        employees: "",
        startDate: "",
        endDate: "",
      }); // Reset form
      console.log("KPI CREATED SUCCESSFULLY", response);
    } catch (error) {
      console.error("Error creating target:", error.response?.data || error.message);
      setSuccessMessage(""); // Clear success message
      setErrorMessage("Failed to create target. Please try again.");
    }
  };
  

  // Handle "Add More Targets"
  const handleAddMore = () => {
    setFormData({
      title: "",
      kpiWeight: "",
      description: "",
      employees: "",
      startDate: "",
      endDate: "",
    });
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Handle dropdown visibility on blur
  const handleBlur = () => {
    setTimeout(() => setDropdownVisible(false), 200); // Delay to allow clicks
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-6">Target Setup</h2>
      <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full p-3 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:outline-none"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* KPI Weight */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            KPI Weight
          </label>
          <select
            name="kpiWeight"
            value={formData.kpiWeight}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:outline-none"
          >
            <option value="">Select KPI Weight</option>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
          </select>
          {errors.kpiWeight && (
            <p className="text-red-500 text-sm">{errors.kpiWeight}</p>
          )}
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:outline-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Employees */}
        <div className="relative">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Employees
          </label>
          <input
            type="text"
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            placeholder="Enter employee names"
            onFocus={() => setDropdownVisible(true)} // Show dropdown on focus
            onBlur={handleBlur} // Hide dropdown on blur
            className="w-full p-3 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:outline-none"
          />
          {errors.employees && (
            <p className="text-red-500 text-sm">{errors.employees}</p>
          )}

          {/* Filtered Employee List */}
          {dropdownVisible && (
            <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 z-10 max-h-40 overflow-y-auto w-full">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleEmployeeSelect(user)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {user.firstName} {user.lastName}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No users found</div>
              )}
            </div>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:outline-none"
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-[#F8FAFC] focus:outline-none"
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex space-x-4 mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleAddMore}
            className="px-6 py-3 bg-[#FFC107] text-black rounded-lg hover:bg-yellow-500"
          >
            Add More Targets
          </button>
        </div>
      </form>

      {/* Success Message */}
      {successMessage && (
        <p className="mt-4 text-green-600">{successMessage}</p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="mt-4 text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default TargetSetup;




