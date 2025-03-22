import React, { useState, useEffect } from "react";
import { Banknote, User, Search, CheckCircle } from "lucide-react";
import axios from "axios";

const PayrollDashboard = () => {
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [salary, setSalary] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        const users = response.data?.users || [];

        const processedUsers = await Promise.all(
          users.map(async (user) => {
            let profileImage =
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"; // Default profile image

            if (user.profilePic?.data?.data) {
              try {
                const uint8Array = new Uint8Array(user.profilePic.data.data);
                const blob = new Blob([uint8Array], {
                  type: user.profilePic.contentType || "image/jpeg",
                });
                profileImage = URL.createObjectURL(blob);
              } catch (err) {
                console.error("Error processing profile image:", err);
              }
            }

            return { ...user, profileImage };
          })
        );

        // Sort users by first name
        const sortedUsers = processedUsers.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );

        setUserList(sortedUsers);
      } catch (error) {
        console.error(
          "Error fetching Users:",
          error.response?.data || error.message
        );
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on the search term
  const filteredUsers = userList.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Pay Now button click
  const handlePayNow = (user) => {
    setSelectedUser(user);
    setSalary(user.salary);
    setShowModal(true);
  };

  const handleSendPayout = async () => {
    if (
      !selectedUser ||
      !selectedUser.bankDetails ||
      !selectedUser.bankDetails[0]
    ) {
      alert("User bank details are missing.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/payouts", {
        amount: salary,
        userId: selectedUser._id,
        bankDetails: selectedUser.bankDetails[0],
      });

      if (response.data.success) {
        console.log("Payout Successful. Payslip Saved:", response.data.payslip);
        setShowModal(false); // Close the payment modal
        setShowSuccessModal(true); // Show the success modal

        // Hide the success modal after 3 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 1000);
      } else {
        alert("Failed to process the payout.");
      }
    } catch (error) {
      console.error("An error occurred while processing the payout:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <h1 className="text-3xl font-bold mb-6">Payroll Management</h1>

      {/* Search Bar */}
      <div className="mb-4 flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <div className="p-2 bg-gray-200">
          <Search className="text-gray-600" />
        </div>
        <input
          type="text"
          placeholder="Search by first or last name"
          className="flex-1 p-2 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Employee Table */}
      {/* Employee Table Container with Scrolling */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="min-w-full ">
            <thead className="sticky top-0 bg-gray-100 shadow">
              <tr className="text-left">
                <th className="p-3 select-none">
                  <User className="inline mr-2" />
                  Employee
                </th>
                <th className="p-3 select-none">Department/Job Title</th>
                <th className="p-3 select-none">Bank Details</th>
                <th className="p-3 select-none">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border border-gray-300"
                    />
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-3 select-none">
                    <p>
                      <strong>Department:</strong> {user.department}
                    </p>
                    <p>
                      <strong>Job Title:</strong> {user.jobTitle}
                    </p>
                  </td>
                  <td className="p-3">
                    {user.bankDetails?.length > 0 ? (
                      user.bankDetails.map((bank, index) => (
                        <div key={index} className="mb-2">
                          <p className="select-none">
                            <strong>Bank:</strong> {bank.bankName}
                          </p>
                          <p className="select-none">
                            <strong>Acc:</strong> {bank.accountNumber}
                          </p>
                          <p className="select-none">
                            <strong>IFSC:</strong> {bank.ifscCode}
                          </p>
                          <hr className="my-2" />
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 select-none">
                        No bank details available
                      </p>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      className={`flex items-center ${
                        user.bankDetails?.length > 0
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-white px-4 py-2 rounded-md`}
                      onClick={() =>
                        user.bankDetails?.length > 0 ? handlePayNow(user) : null
                      }
                      disabled={user.bankDetails?.length === 0}
                    >
                      <Banknote className="inline mr-2" />
                      Pay Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found.</p>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
            <div className="flex justify-center items-center mb-4">
              <CheckCircle className="text-green-500 text-4xl" />
            </div>
            <h2 className="text-lg font-bold text-center">
              Payment Successful
            </h2>
            <p className="text-center text-gray-600 mt-2">
              The payout has been successfully processed.
            </p>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[700px]">
            <div className="flex">
              {/* Left Side: Profile Image */}
              <div className="w-1/3 p-4">
                <img
                  src={selectedUser.profileImage}
                  alt="User Profile"
                  className="w-full h-auto rounded"
                />
              </div>

              {/* Right Side: User Details */}
              <div className="w-2/3 p-4">
                <h2 className="text-xl font-bold mb-4 select-none">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <p className="select-none">
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p className="select-none">
                  <strong>Phone:</strong> {selectedUser.phone}
                </p>
                <p className="select-none">
                  <strong>Account No:</strong>{" "}
                  {selectedUser.bankDetails[0]?.accountNumber}
                </p>
                <p className="select-none">
                  <strong>IFSC:</strong> {selectedUser.bankDetails[0]?.ifscCode}
                </p>

                <div className="mt-2">
                  <label className="block mb-1 font-semibold select-none">
                    Salary
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Enter Salary Amount"
                  />
                </div>

                <div className="flex justify-end mt-4 gap-4">
                  <button
                    className="bg-gray-300 text-black px-4 py-2 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    onClick={handleSendPayout}
                  >
                    Send Payout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollDashboard;
