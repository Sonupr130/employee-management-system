import mongoose from "mongoose";

const KPISchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: { type: String, required: true },       // KPI title
    description: { type: String },                // Description of the KPI
    kpiWeight: { type: Number, required: true },     // KPI weight as a percentage
    startDate: { type: String, required: true },    // Start date of the KPI
    endDate: { type: String, required: true },      // End date of the KPI
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("KPI", KPISchema);
