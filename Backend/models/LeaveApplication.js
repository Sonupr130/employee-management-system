import mongoose from 'mongoose';


const leaveApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add user reference
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  startDate: { type: String, match: /^\d{4}-\d{2}-\d{2}$/, required: true },
  endDate: { type: String, match: /^\d{4}-\d{2}-\d{2}$/, required: true },
  resumptionDate:{type: Date, match: /^\d{4}-\d{2}-\d{2}$/, required: true},
  type: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Declined'], default: 'Pending' }, 
});




export default mongoose.model("LeaveApplication", leaveApplicationSchema);
