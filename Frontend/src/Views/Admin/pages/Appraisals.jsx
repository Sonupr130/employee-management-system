import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../../config.js";

const Appraisals = () => {
  const [pendingAppraisals, setPendingAppraisals] = useState([]);
  const [selectedAppraisal, setSelectedAppraisal] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchPendingAppraisals = async () => {
      try {
        const { data } = await axios.get(
          // "http://localhost:5000/get-all-appraisal-scores"
         `${config.backendUrl}/get-all-appraisal-scores`
        );
        setPendingAppraisals(data);
      } catch (error) {
        console.error("Error fetching pending appraisals:", error);
      }
    };

    fetchPendingAppraisals();
  }, []);

  const handleSubmit = async () => {
    if (!selectedAppraisal) return alert("Please select an appraisal");

    try {
      await axios.put(
        // `http://localhost:5000/update-appraisal/${selectedAppraisal._id}`,
       `${config.backendUrl}/update-appraisal/${selectedAppraisal._id}`,
        {
          finalScore: score,
          feedback,
          status: "Reviewed",
        }
      );

      alert("Appraisal updated successfully!");
      setPendingAppraisals((prev) =>
        prev.filter((appraisal) => appraisal._id !== selectedAppraisal._id)
      );
      setSelectedAppraisal(null);
      setScore(0);
      setFeedback("");
    } catch (error) {
      console.error("Error updating appraisal:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white ">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Admin Appraisal Review
      </h2>

      {pendingAppraisals.length > 0 ? (
        <>
          <label className="block mb-2 font-medium">Select an Appraisal</label>
          <select
            className="border p-2 mb-4 w-full rounded"
            onChange={(e) => {
              const appraisal = pendingAppraisals.find(
                (item) => item._id === e.target.value
              );
              setSelectedAppraisal(appraisal || null);
            }}
          >
            <option value="">-- Choose an Appraisal --</option>
            {pendingAppraisals.map((appraisal) => (
              <option key={appraisal._id} value={appraisal._id}>
                {appraisal.user ? appraisal.user : "Unknown User"} - {appraisal.month}
              </option>
            ))}
          </select>

          {selectedAppraisal && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-2">User Details</h3>
              <p><strong>Name:</strong> {selectedAppraisal.user}</p>
              <p><strong>Self-Appraisal:</strong> {selectedAppraisal.selfAppraisal}</p>

              <h3 className="font-semibold mt-4 mb-2">Assigned KPIs</h3>
              {selectedAppraisal.kpis.length > 0 ? (
                <ul className="mb-4">
                  {selectedAppraisal.kpis.map((kpi) => (
                    <li key={kpi.kpiId} className="text-gray-700">
                      📌 <strong>{kpi.title}</strong> (Weight: {kpi.kpiWeight})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No KPIs assigned.</p>
              )}

              <h3 className="font-semibold mb-2">Give Score</h3>
              <input
                type="number"
                className="border p-2 w-full rounded"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                min="0"
                max="100"
              />

              <h3 className="font-semibold mt-3 mb-2">Give Feedback</h3>
              <textarea
                className="border p-2 w-full rounded"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="3"
              />

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit Appraisal
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center">No pending appraisals.</p>
      )}
    </div>
  );
};

export default Appraisals;
