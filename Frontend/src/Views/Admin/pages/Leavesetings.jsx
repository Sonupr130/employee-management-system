import React from 'react';
import leave1 from "../../../assets/leave 1.png";
const Leavesetings = () => {
  return (
    <div className="bg-blue-900 text-white rounded-lg p-8 flex justify-between items-center mx-4 mt-6">
    <div>
      <h2 className="text-4xl font-bold mb-4">
        Manage ALL{" "}
        <span className="text-yellow-400">Leave Applications</span>
      </h2>
      <p className="text-lg">
        A relaxed employee is a performing employee.
      </p>
    </div>
    <div>
      <img
        src={leave1}
        alt="Relaxed person"
        className="w-64 h-auto"
      />
    </div>
  </div>
  );
}

export default Leavesetings;
