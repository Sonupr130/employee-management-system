import config from "../../../config.js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SuccessModal from "./SucessPop"; // Import the Modal component
import axios from "axios";


const LeaveDashboard = () => {
  const [modalData, setModalData] = useState(null);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Dynamic Leave Balances
  const [leaveBalances, setLeaveBalances] = useState({
    "Annual Leave": 20,
    "Sick Leave": 20,
    "Causal Leave": 20,
    "Compassionate Leave": 20,
  });

  const leaveTypes = [
    { type: "Annual Leave", route: "/leavedashboard/annualleave" },
    { type: "Sick Leave", route: "/leavedashboard/sickleave" },
    { type: "Causal Leave", route: "/maternity-leave" },
    { type: "Compassionate Leave", route: "/compassionate-leave" },
  ];

  useEffect(() => {
        const fetchLeaveHistory = async () => {
          if (!token) {
            setError("No authentication token found. Please log in.");
            return;
          }
    
          try {
            setError(null);
            // const response = await axios.get("http://localhost:5000/get-leave-history", {
            const response = await axios.get(`${config.backendUrl}/get-leave-history`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            const leaveData = response.data;
            setLeaveHistory(leaveData);
    
            // Calculate updated leave balances
            const updatedBalances = { ...leaveBalances };
            leaveData.forEach((leave) => {
              if (leave.status === "Approved" && leave.type in updatedBalances) {
                updatedBalances[leave.type] -= leave.duration;
              }
            });
    
            setLeaveBalances(updatedBalances);
          } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch leave history");
          }
        };
    
        fetchLeaveHistory();
      }, [token]);

  const openModal = (leave) => {
    setModalData(leave);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const onSubmit = async (data) => {
    if (!modalData) {
      console.error("Error: No leave type selected.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Error: No token found. Please log in.");
        return;
      }

      // Fetch user data using the token
      const userResponse = await axios.get(
        // "http://localhost:5000/get-user-data",
        `${config.backendUrl}/get-user-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(userResponse);

      const userName = userResponse.data.name;
      if (!userName) {
        console.error("Error: User name is missing.");
        return;
      }

      const payload = {
        name: userName,
        duration: data.duration,
        startDate: formatDate(data.startDate), // ✅ Use formatDate
        endDate: formatDate(data.endDate), // ✅ Use formatDate
        resumptionDate: formatDate(data.resumptionDate), // ✅ Use formatDate
        type: modalData.type,
        reason: data.reason,
      };

      console.log("Sending payload:", payload); // Debugging log

      const response = await axios.post(
        // "http://localhost:5000/create-leave-application",
       `${config.backendUrl}/create-leave-application`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ FIXED: Token must be included
          },
        }
      );

      if (response.status === 201) {
        setModalVisible(true);
        reset();
      }
    } catch (error) {
      console.error(
        "Error submitting leave application:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="bg-[#E3EDF9] py-4">
      <div className="p-4 ml-6 mr-6 bg-white text-2xl hover:text-blue-500">
        Dashboard/applyforleave
      </div>

      <div className="p-6 bg-white mt-8 ml-8 mr-8">
        <h1 className="text-2xl mt-4 font-semibold mb-6">Leave Application</h1>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {leaveTypes.map((leave, index) => (
            <div
              key={index}
              className="bg-blue-600 shadow rounded-lg p-6 flex flex-col items-center"
            >
              <span className="text-4xl font-bold text-white">{leaveBalances[leave.type] || 0}</span>
              <button
                onClick={() => openModal(leave)}
                className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-green-600"
              >
                {leave.type}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg p-6 h-[60vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Leave History</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4">Name(s)</th>
                <th className="p-4">Duration(s)</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Type</th>
                <th className="p-4">Reason(s)</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.length > 0 ? (
                leaveHistory.map((leave, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="p-4">{leave.name || "N/A"}</td>
                    <td className="p-4">{leave.duration || "N/A"}</td>
                    <td className="p-4">{formatDate(leave.startDate)}</td>
                    <td className="p-4">{formatDate(leave.endDate)}</td>
                    <td className="p-4">{leave.type || "N/A"}</td>
                    <td className="p-4">{leave.reason || "N/A"}</td>
                    <td>
                      <button
                        className={`px-2 py-1 text-black rounded-lg cursor-default 
    ${leave.status === "Pending" ? "bg-yellow-500" : ""} 
    ${leave.status === "Approved" ? "bg-green-500 text-white" : ""} 
    ${leave.status === "Declined" ? "bg-red-500" : ""}`}
                      >
                        {leave.status || "N/A"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No leave records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="rounded-lg shadow-lg  h-[90%] w-[40%] overflow-y-auto relative scrollbar-hidden">
            <div className="bg-[#E3EDF9]">
              <div className="min-h-screen  bg-white flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 w-[50vw]">
                  <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                    <span className="material-icons mr-2">book</span>
                    Leave Application
                  </h1>
                  <p className="text-gray-600 mb-6 flex items-center justify-center">
                    Fill the required fields below to apply for {modalData.type}
                    .
                  </p>
                  <div
                    onClick={closeModal}
                    className="absolute top-10 text-5xl right-10 text-black hover:text-red-500 p-2 rounded-full hover:bg-red-100 transition-all ease-in-out"
                  >
                    &times;
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Leave Type
                      </label>
                      <input
                        type="text"
                        value={modalData.type}
                        readOnly
                        className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          {...register("startDate", {
                            required: "Start date is required",
                          })}
                          className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm"
                        />
                        {errors.startDate && (
                          <p className="text-red-500 text-sm">
                            {errors.startDate.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          {...register("endDate", {
                            required: "End date is required",
                          })}
                          className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm"
                        />
                        {errors.endDate && (
                          <p className="text-red-500 text-sm">
                            {errors.endDate.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Duration
                      </label>
                      <input
                        type="number"
                        {...register("duration", {
                          required: "Duration is required",
                        })}
                        className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm"
                      />
                      {errors.duration && (
                        <p className="text-red-500 text-sm">
                          {errors.duration.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Resumption Date
                      </label>
                      <input
                        type="date"
                        {...register("resumptionDate", {
                          required: "Resumption date is required",
                        })}
                        className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm"
                      />
                      {errors.resumptionDate && (
                        <p className="text-red-500 text-sm">
                          {errors.resumptionDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Reason for Leave
                      </label>
                      <textarea
                        rows="3"
                        {...register("reason", {
                          required: "Reason is required",
                        })}
                        className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm"
                      ></textarea>
                      {errors.reason && (
                        <p className="text-red-500 text-sm">
                          {errors.reason.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between mt-4">
                      <button
                        type="submit"
                        className="bg-green-500 w-60 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={() => reset()}
                        className="bg-red-500 text-white w-60 py-2 px-6 rounded-lg shadow-md hover:bg-red-600"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {isModalVisible && <SuccessModal onClose={handleCloseModal} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveDashboard;














