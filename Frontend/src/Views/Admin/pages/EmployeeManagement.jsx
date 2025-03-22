import React, { useState, useEffect } from "react";
import ViewProfile from "../pages/ViewProfile";
import EditProfile from "../pages/EditProfile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [actionDropdown, setActionDropdown] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeView, setActiveView] = useState("table");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    jobTitles: [],
    categories: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    jobTitle: "",
    category: "",
  });
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
  
    const filtered = employees.filter((emp) =>
      Object.values(emp)
        .map((value) => (value ? value.toString().toLowerCase() : "")) // Ensure value exists
        .some((val) => val.includes(searchQuery))
    );
  
    setFilteredEmployees(filtered);
  };
  

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        console.log("Fetched Employees:", response.data);
        const users = response.data.users; // Set the fetched data to state
        setEmployees(users);
        setFilteredEmployees(users);
        setLoading(false);

        const jobTitles = [...new Set(users.map((user) => user.jobTitle))];
        const categories = [...new Set(users.map((user) => user.category))];
        setFilterOptions({ jobTitles, categories });
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("Unable to load employee data");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleActionClick = (index) => {
    setActionDropdown(index === actionDropdown ? null : index);
  };

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setActiveView("view");
    setActionDropdown(null);
  };

  const handleEditProfile = (employee) => {
    setSelectedEmployee(employee);
    setActiveView("edit");
    setActionDropdown(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = employees;
    if (selectedFilters.jobTitle) {
      filtered = filtered.filter(
        (emp) => emp.jobTitle === selectedFilters.jobTitle
      );
    }
    if (selectedFilters.category) {
      filtered = filtered.filter(
        (emp) => emp.category === selectedFilters.category
      );
    }
    setFilteredEmployees(filtered);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedFilters({ jobTitle: "", category: "" });
    setFilteredEmployees(employees);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Data", 14, 10);

    autoTable(doc, {
      head: [
        ["Name", "Department", "Job Title", "Start Date", "Category", "Gender"],
      ],
      body: filteredEmployees.map((emp) => [
        `${emp.firstName} ${emp.lastName}`,
        emp.department,
        emp.jobTitle,
        emp.startDate,
        emp.category,
        emp.gender,
      ]),
      theme: "striped",
      styles: { fontSize: 10 },
      margin: { top: 20 },
    });

    doc.save("filtered_employees.pdf");
  };

  const handleSaveProfile = async (updatedEmployee) => {
    try {
      // Use the employee's ID to update the correct record
      const response = await fetch(
        `http://localhost:5000/users/${updatedEmployee._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save updated employee");
      }

      // Update the local state with the updated employee data
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === updatedEmployee._id ? updatedEmployee : emp
        )
      );

      // Reset the view to the employee table
      setActiveView("table");
      setSelectedEmployee(null);
    } catch (error) {
      console.error(error);
      alert("Failed to save employee profile");
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }
    if (!Array.isArray(employees)) {
      return <div className="text-red-500">Invalid employee data format</div>;
    }

    switch (activeView) {
      case "view":
        console.log("Selected Employee:", selectedEmployee);
        return selectedEmployee && <ViewProfile employee={selectedEmployee} />;

      case "edit":
        return (
          selectedEmployee && (
            <EditProfile
              employee={selectedEmployee}
              onSave={handleSaveProfile}
            />
          )
        );
      default:
        return (
          <div className="bg-white p-8 rounded-lg shadow-md ">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center px-4 py-2 bg-yellow-300 rounded-md"
              >
                <span className="material-icons mr-2">filter_list</span>
                Filter
              </button>
              <input
                type="text"
                placeholder="Search Employee..."
                value={searchTerm}
                onChange={handleSearch}
                className="border p-2 rounded-md"
              />
              </div>
              <button
                onClick={exportToPDF}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Export
              </button>
              {filterOpen && (
                <div className="absolute bg-white p-4 shadow-md rounded-md mt-2">
                  <label className="block mb-2">
                    Job Title:
                    <select
                      name="jobTitle"
                      value={selectedFilters.jobTitle}
                      onChange={handleFilterChange}
                      className="block w-full border p-2 rounded-md"
                    >
                      <option value="">All</option>
                      {filterOptions.jobTitles.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block mb-2">
                    Category:
                    <select
                      name="category"
                      value={selectedFilters.category}
                      onChange={handleFilterChange}
                      className="block w-full border p-2 rounded-md"
                    >
                      <option value="">All</option>
                      {filterOptions.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    onClick={applyFilters}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Apply
                  </button>
                  <button
                    onClick={clearFilters}
                    className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-md"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            <div className="overflow-y-auto max-h-[80vh] ">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left text-sm font-medium text-gray-700">
                    <th className="p-4">Name(s)</th>
                    <th className="p-4">Dept</th>
                    <th className="p-4">Job Title</th>
                    <th className="p-4">Start Date</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Gender</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee, index) => (
                    <tr
                      key={employee._id}
                      className="border-b hover:bg-gray-100 "
                    >
                      <td className="p-4">{`${employee.firstName} ${employee.lastName}`}</td>
                      <td className="p-4">{employee.department}</td>
                      <td className="p-4">{employee.jobTitle}</td>
                      <td className="p-4">{employee.startDate}</td>
                      <td className="p-4">{employee.category}</td>
                      <td className="p-4">{employee.gender}</td>
                      <td className="p-4">
                        <div className="relative">
                          <button
                            onClick={() => handleActionClick(index)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                          >
                            Actions
                            <span className="material-icons ml-2">
                              arrow_drop_down
                            </span>
                          </button>
                          {actionDropdown === index && (
                            <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                              <ul className="text-sm text-gray-700">
                                <li
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleViewProfile(employee)}
                                >
                                  View Profile
                                </li>
                                <li
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleEditProfile(employee)}
                                >
                                  Edit Profile
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#E3EDF9] ">
      <div className="flex-1">
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
