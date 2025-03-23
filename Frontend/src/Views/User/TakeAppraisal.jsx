import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config.js";

const TakeAppraisal = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selfAppraisal, setSelfAppraisal] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null); // ✅ Store userId in state

  useEffect(() => {
    const fetchUserDataAndKPIs = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("used id ",token);
        if (!token) {
          setMessage("No authentication token found. Please log in.");
          return;
        }

        // Fetch user data
        // const { data: userData } = await axios.get("http://localhost:5000/get-user-data", {
        const { data: userData } = await axios.get(`${config.backendUrl}/get-user-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User Data:", userData);
        const fetchedUserId = userData?._id;
        setUserId(fetchedUserId);

        if (!fetchedUserId) {
          setMessage("User ID not found.");
          return;
        }

        // Fetch completed tasks (KPIs)
        // const { data } = await axios.get(`http://localhost:5000/kpi/usercompleted/${fetchedUserId}`);
        const { data } = await axios.get(`${config.backendUrl}/kpi/usercompleted/${fetchedUserId}`);
        
        const completed = data
          .filter((kpi) => kpi.status === "Completed")
          .map((kpi) => ({
            kpiId: kpi._id, // ✅ Send correct kpiId
            title: kpi.title,
            kpiWeight: kpi.kpiWeight,
          }));

        console.log("Completed KPIs:", completed);
        setCompletedTasks(completed);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load data.");
      }
      setLoading(false);
    };

    fetchUserDataAndKPIs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User ID is missing. Try reloading the page.");
      return;
    }

    if (!selfAppraisal || completedTasks.length === 0) {
      setMessage("You must complete tasks and provide self-appraisal.");
      return;
    }

    // ✅ Debugging log before sending request
    console.log("Submitting appraisal with:", {
      user: userId,
      kpis: completedTasks,
      selfAppraisal,
      status: "Pending",
    });

    try {
      // const response = await axios.post("http://localhost:5000/request-appraisal", {
      const response = await axios.post(`${config.backendUrl}/request-appraisal`, {
        user: userId, // ✅ Send correct userId
        kpis: completedTasks, // ✅ Send correct kpi details
        selfAppraisal,
        status: "Pending",
      });

      console.log("Response:", response.data);
      setMessage("Appraisal request submitted successfully!");
      setSelfAppraisal("");
      setCompletedTasks([]); // ✅ Clear completed tasks after submission
    } catch (error) {
      console.error("Error submitting request:", error.response?.data || error.message);
      setMessage("Failed to submit request. Try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Take Appraisal</h2>

      {loading ? (
        <p>Loading...</p>
      ) : completedTasks.length > 0 ? (
        <>
          <p className="text-gray-700 mb-3">Completed Tasks:</p>
          <ul className="mb-4">
            {completedTasks.map((task) => (
              <li key={task.kpiId} className="text-green-600">
                ✅ {task.title} (Weight: {task.kpiWeight})
              </li>
            ))}
          </ul>

          <textarea
            className="w-full p-2 border rounded mb-4"
            placeholder="Write about your achievements..."
            value={selfAppraisal}
            onChange={(e) => setSelfAppraisal(e.target.value)}
          ></textarea>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Appraisal Request
          </button>

          {message && <p className="mt-3 text-gray-600">{message}</p>}
        </>
      ) : (
        <p className="text-gray-500">No completed tasks yet.</p>
      )}
    </div>
  );
};

export default TakeAppraisal;











