import React, { useState } from "react";

const UpdateFinancial = ({ detail, onBack }) => {
  const [formData, setFormData] = useState({ ...detail }); // Initialize state with the passed detail

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Financial Details:", formData);
    alert("Account details updated successfully!");
    onBack(); // Navigate back to the financial details list
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-3xl mx-auto shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Update Financial Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="accountNumber"
              className=" block text-sm font-medium text-gray-700"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="bg-[#E3EDF9] w-full  text-gray-700 rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="accountName"
              className="block text-sm font-medium text-gray-700"
            >
              Account Name
            </label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className=" bg-[#E3EDF9] w-full  text-gray-700 rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="bankName"
              className="block text-sm font-medium text-gray-700"
            >
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="bg-[#E3EDF9] w-full  text-gray-700 rounded-md p-2"
            />
          </div>
          <div>
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700"
            >
              Account Type
            </label>
            <input
              type="text"
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="bg-[#E3EDF9] w-full  text-gray-700 rounded-md p-2"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition shadow-md"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFinancial;
