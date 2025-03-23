import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form"; // Importing useForm hook for form handling
import { toast } from "react-toastify";
import config from "../../../../config.js";

const Leaverecall = () => {
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [showRecallForm, setShowRecallForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Set up useForm hook
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchApprovedApplications = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/leave-applications/approved"
          `${config.backendUrl}/leave-applications/approved`
        );
        const filteredApplications = response.data.filter(
          (app) => app.status === "Approved"
        );
        setApprovedApplications(filteredApplications);
      } catch (error) {
        console.error("Error fetching approved leave applications:", error);
      }
    };

    fetchApprovedApplications();
  }, []);

  // Handle clicking on the Recall button
  const handleRecallClick = (application) => {
    setSelectedApplication(application);
    setShowRecallForm(true);
    // Reset form and set initial values from the selected application
    reset({
      employeeName: application.name,
      department: application.department,
      startDate: application.startDate,
      endDate: application.endDate,
      daysRemaining: application.daysRemaining,
      resumptionDate: "",
      reliefOfficer: application.reliefOfficer,
    });
  };

  // Handle form submit
  const onSubmit = async (data) => {
    console.log("Form Submitted: ", data);
    toast.success("Recall Initiated Successfully!");
    setShowSuccessModal(true);

    // Send Notification to User
    try {
      // const response = await axios.post("http://localhost:5000/notifications", {
      const response = await axios.post(`${config.backendUrl}/notifications`, {
        userId: selectedApplication.userId, // Ensure this value is not undefined
        message: `Your leave recall has been initiated.`,
      });
    
      console.log("Notification Response:", response.data); // Debugging log
    } catch (error) {
      console.error("Error sending notification:", error.response?.data || error);
    }
  };

  // Handle closing the recall form modal
  const closeRecallForm = () => {
    setShowRecallForm(false);
    setSelectedApplication(null);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    closeRecallForm();
  };

  return (
    <div className="flex bg-blue-900 w-[80vw] rounded-lg shadow-xl">
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Approved Leave Applications
        </h2>

        <div className="overflow-y-scroll w-[75vw] h-[60vh] bg-white rounded-lg ">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Duration
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Start Date
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  End Date
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Type
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Reason
                </th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {approvedApplications.length > 0 ? (
                approvedApplications.map((application, index) => (
                  <tr
                    key={application._id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-blue-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-700">
                      {application.name}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {application.duration} Days
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {application.startDate}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {application.endDate}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {application.type}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {application.reason}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleRecallClick(application)} // Show the form when "Recall" is clicked
                        className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                      >
                        Recall
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">
                    No approved leave applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conditional rendering of the Recall Form modal */}
      {showRecallForm && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto z-50">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md mt-8"
          >
            <h2 className="text-xl text-black font-semibold mb-2 text-center">
              Leave Recall
            </h2>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Fill in the required details to recall this employee
            </p>

            <div className="space-y-4">
              <label className="text-black">Employee Name</label>
              <input
                type="text"
                {...register("employeeName")}
                value={selectedApplication.name || ""}
                disabled
                className="text-black w-full p-2 bg-[#E3EDF9] border rounded"
              />

              <label className="text-black">Department</label>
              <input
                type="text"
                {...register("department")}
                // value={selectedApplication.department || ""}
                
                className="w-full text-black p-2 bg-[#E3EDF9] border rounded"
              />

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-black">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register("startDate")}
                      value={
                        selectedApplication.startDate
                          ? selectedApplication.startDate.split("T")[0]
                          : ""
                      }
                      disabled
                      className="text-black bg-[#E3EDF9] w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label className="text-black">End Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register("endDate")}
                      value={
                        selectedApplication.endDate
                          ? selectedApplication.endDate.split("T")[0]
                          : ""
                      }
                      disabled
                      className="text-black bg-[#E3EDF9] w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-black">Days Remaining</label>
                  <input
                    type="text"
                    {...register("daysRemaining")}
                    // value={selectedApplication.daysRemaining || ""}
                    
                    className="text-black bg-[#E3EDF9] w-full p-2 border rounded"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-black">New Resumption Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register("resumptionDate")}
                      className="text-black bg-[#E3EDF9] w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>

              <label className="text-black">Relief Officer(s)</label>
              <input
                type="text"
                {...register("reliefOfficer")}
                // value={selectedApplication.reliefOfficer || ""}
                
                className="text-black bg-[#E3EDF9] w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                // onClick={handelInitiate}
                className="bg-green-600 text-white px-6 py-2 rounded-xl"
              >
                Initiate Recall
              </button>
              <button
                type="button"
                onClick={closeRecallForm}
                className="border border-red-600 text-red-600 px-6 py-2 rounded-xl hover:bg-red-600 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeSuccessModal}>
          <div className="bg-white p-6 rounded-xl  shadow-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-2">Success</h2>
            <p className="text-gray-600 mb-4">Leave recall initiated successfully!</p>
            <button onClick={closeSuccessModal} className="bg-blue-600 text-white px-6 py-2 rounded-xl">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaverecall;