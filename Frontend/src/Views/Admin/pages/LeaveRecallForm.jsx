import { useForm } from "react-hook-form";

export default function LeaveRecallForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      employeeName: "John Dore",
      department: "Sales and Marketing",
      startDate: "2022-04-22",
      endDate: "2022-04-27",
      daysRemaining: "3",
      resumptionDate: "",
      reliefOfficer: "James Dory",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-center">Leave Recall</h2>
      <p className="text-gray-600 text-sm mb-4 text-center">
        Fill in the required details to recall this employee
      </p>

      <div className="space-y-4">
        <label>Employee Name</label>
        <input type="text" {...register("employeeName")} disabled className="w-full p-2 bg-[#E3EDF9] border rounded" />
        
        <label>Department</label>
        <input type="text" {...register("department")} disabled className="w-full p-2 bg-[#E3EDF9] border rounded" />
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label>Start Date</label>
            <div className="relative">
              <input type="date" {...register("startDate")} disabled className="bg-[#E3EDF9] w-full p-2 border rounded" />
              <span className="material-icons absolute right-2 top-2">calendar_today</span>
            </div>
          </div>
          
          <div className="flex-1">
            <label>End Date</label>
            <div className="relative">
              <input type="date" {...register("endDate")} disabled className="bg-[#E3EDF9] w-full p-2 border rounded" />
              <span className="material-icons absolute right-2 top-2">calendar_today</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label>Days Remaining</label>
            <input type="text" {...register("daysRemaining")} disabled className="bg-[#E3EDF9] w-full p-2 border rounded" />
          </div>
          
          <div className="flex-1">
            <label>New Resumption Date</label>
            <div className="relative">
              <input type="date" {...register("resumptionDate")} className="bg-[#E3EDF9] w-full p-2 border rounded" />
              <span className="material-icons absolute right-2 top-2">calendar_today</span>
            </div>
          </div>
        </div>
        
        <label>Relief Officer(s)</label>
        <input type="text" {...register("reliefOfficer")} disabled className="bg-[#E3EDF9] w-full p-2 border rounded" />
      </div>

      <div className="flex justify-between mt-6">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-xl">Initiate Recall</button>
        <button type="button" className="border border-red-600 text-red-600 px-6 py-2 rounded-xl">Cancel</button>
      </div>
    </form>
  );
}