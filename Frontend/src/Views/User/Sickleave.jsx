import React from 'react';
import Navbar from './Usernavbar';
import { useForm } from 'react-hook-form';
const Sickleave = () => {
    const {
              register,
              handleSubmit,
              reset,
              formState: { errors },
            } = useForm();
          
            const onSubmit = (data) => {
              console.log(data);
              alert('Leave application submitted successfully!');
              reset();
            };
  return (
    <div className='bg-[#E3EDF9]'>
       <Navbar/>
       <div className="bg-white  mt-6 ml-8 mr-8 flex space-x-8 text-gray-700 text-lg">
        <a href="#" className="p-4 ml-6 text-2xl hover:text-blue-500">
          Dashboard/applyforleave/Sick leave
        </a>
      </div>
      
      <div className="min-h-screen mt-6 bg-[#E3EDF9] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[50vw]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <span className="material-icons mr-2">book</span>
          Leave Application
        </h1>
        <p className="text-gray-600 mb-6 flex items-center justify-center">Fill the required fields below to apply for Sick leave.</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Leave Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
            <input
              type="text"
              value="Sick Leave"
              readOnly
              className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Start Date and End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: 'Start date is required' })}
                className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">End Date</label>
              <input
                type="date"
                {...register('endDate', { required: 'End date is required' })}
                className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Duration</label>
            <input
              type="number"
              value="60"
              readOnly
              className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Resumption Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Resumption Date</label>
            <input
              type="date"
              {...register('resumptionDate', { required: 'Resumption date is required' })}
              className="w-full bg-[#E3EDF9] p-2  border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.resumptionDate && <p className="text-red-500 text-sm">{errors.resumptionDate.message}</p>}
          </div>

          {/* Reason for Leave */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Reason for Leave</label>
            <textarea
              rows="3"
              {...register('reason', { required: 'Reason is required' })}
              className="w-full bg-[#E3EDF9] p-6 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide a reason for your leave request"
            ></textarea>
            {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
          </div>

          {/* Attach Handover Document */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Attach Handover Document</label>
            <input
              type="file"
              {...register('handoverDocument', { required: 'Handover document is required' })}
              className="w-full text-white  border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.handoverDocument && <p className="text-red-500 text-sm">{errors.handoverDocument.message}</p>}
          </div>

          {/* Choose Relief Officer */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Choose Relief Officer</label>
            <select
              {...register('reliefOfficer', { required: 'Relief officer selection is required' })}
              className="w-full bg-[#E3EDF9] p-2 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your relief officer</option>
              <option value="1">Relief Officer 1</option>
              <option value="2">Relief Officer 2</option>
              <option value="3">Relief Officer 3</option>
            </select>
            {errors.reliefOfficer && <p className="text-red-500 text-sm">{errors.reliefOfficer.message}</p>}
          </div>

          {/* Submit and Reset Buttons */}
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
    </div>
  );
}

export default Sickleave;
