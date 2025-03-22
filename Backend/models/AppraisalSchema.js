import mongoose from "mongoose";

const AppraisalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    kpis: [
      {
        kpiId: { type: mongoose.Schema.Types.ObjectId, ref: "KPI" }, // Store reference
        title: { type: String, required: true }, // Store title
        kpiWeight: { type: Number, required: true }, // Store KPI weight
      },
    ],
    selfAppraisal: { // ✅ Added this field
      type: String,
      required: true,
    },
    finalScore: { 
      type: Number, 
      required: true, 
      default: 0, 
    },
    feedback: { 
      type: String, 
      default: "No feedback provided." 
    },
    status: { 
      type: String, 
      enum: ["Pending", "Reviewed", "Finalized"], 
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appraisal", AppraisalSchema);

