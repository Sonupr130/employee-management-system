import React, { useState } from "react";

const UpdateProfessionalDetailsForm = ({ onSubmit }) => {
  const [details, setDetails] = useState({
    title: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <div className="h-[80vh] flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Update Professional Details
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="title">
              Qualification Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter Qualification Title"
              value={details.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
            />
          </div>

          {/* Institution */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="institution">
              Institution
            </label>
            <input
              id="institution"
              name="institution"
              type="text"
              placeholder="Enter Institution Name"
              value={details.institution}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="startDate">
              Start Date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="month"
              value={details.startDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="endDate">
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="month"
              value={details.endDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Description"
              value={details.description}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 text-gray-700 bg-[#E3EDF9] focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-[#28A745] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#218838] focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div> 
  );
};

export default UpdateProfessionalDetailsForm;
