import config from "../../../config.js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SuccessModal from "./SucessPop";
import axios from "axios";

const AnnualLeave = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isModalVisible, setModalVisible] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        // "http://localhost:5000/create-leave-application",
        `${config.backendUrl}/create-leave-application`,
        data
      );
      if (response.status === 200) {
        setModalVisible(true);
        reset();
      }
    } catch (error) {
      console.error("Error submitting leave application:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="bg-[#E3EDF9]">
      <div className="min-h-screen mt-6 bg-[#E3EDF9] flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-[50vw]">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <span className="material-icons mr-2">book</span>
            Leave Application
          </h1>
          <p className="text-gray-600 mb-6 flex items-center justify-center">
            Fill the required fields below to apply for annual leave.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Leave Type
              </label>
              <input
                type="text"
                value="Annual Leave"
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
                  {...register("endDate", { required: "End date is required" })}
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
                Reason for Leave
              </label>
              <textarea
                rows="3"
                {...register("reason", { required: "Reason is required" })}
                className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm"
                placeholder="Provide a reason for your leave request"
              ></textarea>
              {errors.reason && (
                <p className="text-red-500 text-sm">{errors.reason.message}</p>
              )}
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
                Attach Handover Document
              </label>
              <input
                type="file"
                {...register("handoverDocument", {
                  required: "Handover document is required",
                })}
                className="w-full border-gray-300 rounded-lg shadow-sm"
              />
              {errors.handoverDocument && (
                <p className="text-red-500 text-sm">
                  {errors.handoverDocument.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Choose Relief Officer
              </label>
              <select
                {...register("reliefOfficer", {
                  required: "Relief officer selection is required",
                })}
                className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm"
              >
                <option value="" disabled>
                  Select your Team Leader
                </option>
                <option value="1">Sonu Anderson</option>
                <option value="2">Dinesh Jhonson</option>
                <option value="3">Rashmi Freeman</option>
              </select>
              {errors.reliefOfficer && (
                <p className="text-red-500 text-sm">
                  {errors.reliefOfficer.message}
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

      <SuccessModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        message="Your leave application will be reviewed by the admin."
      />
    </div>
  );
};

export default AnnualLeave;
