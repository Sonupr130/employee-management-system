import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageTargets = () => {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionDropdown, setActionDropdown] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/kpi/user");
        setTargets(response.data);
      } catch (err) {
        setError("Failed to load KPI data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleActionClick = (index) => {
    setActionDropdown(index === actionDropdown ? null : index);
  };

  const initiateKPI = async (target) => {
    try {
      const response = await axios.post("http://localhost:5000/initiate", {
        userId: target.user._id,
        kpiId: target._id,
        title: target.title, // Sending title
        description: target.description || "No description", // Sending description
        startDate: target.startDate,
        endDate: target.endDate,
        kpiWeight: target.kpiWeight,
      });

      if (response.status === 201) {
        alert("New KPI created successfully!");
      } else {
        alert("KPI initiated successfully!");
      }

      // Update state to reflect changes
      setTargets((prevTargets) =>
        prevTargets.map((t) =>
          t._id === target._id ? { ...t, status: "In Progress" } : t
        )
      );
    } catch (error) {
      console.error("Error initiating KPI:", error);
      alert("Failed to initiate KPI.");
    }
  };

  if (loading) return <p>Loading KPIs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-2">
      <h2 className="text-lg font-semibold mb-6">Manage Targets</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-sm font-medium text-gray-700">
              <th className="p-4">Name</th>
              <th className="p-4">Title</th>
              <th className="p-4">KPI Weight</th>
              <th className="p-4">Target Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {targets.map((target, index) => (
              <tr key={target._id} className="border-b hover:bg-gray-100">
                <td className="p-4">
                  {target.user
                    ? `${target.user.firstName} ${target.user.lastName}`
                    : "Unknown"}
                </td>
                <td className="p-4">{target.title}</td>
                <td className="p-4">{target.kpiWeight}</td>
                <td className="p-4">
                  {target.startDate} / {target.endDate}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-md text-white text-sm font-semibold
      ${target.status === "Pending" ? "bg-yellow-400" : ""}
      ${target.status === "Completed" ? "bg-green-500" : ""}
      ${target.status === "Not Completed" ? "bg-red-500" : ""}`}
                  >
                    {target.status || "Pending"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="relative">
                    <button
                      onClick={() => handleActionClick(index)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      Actions
                      <svg
                        className="w-4 h-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {actionDropdown === index && (
                      <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                        <ul className="text-sm text-gray-700">
                          <li
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => alert("Edit KPI Goals")}
                          >
                            Edit KPI Goals
                          </li>
                          <li
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => initiateKPI(target)}
                          >
                            Initiate KPI
                          </li>
                          <li
                            className="p-2 hover:bg-gray-100 cursor-pointer text-red-600"
                            onClick={() => alert("Delete KPI")}
                          >
                            Delete KPI
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
};

export default ManageTargets;
