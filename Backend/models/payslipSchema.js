import mongoose from "mongoose";

const payslipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalEarnings: Number,
  totalDeductions: Number,
  netPay: Number,
  period: String,
  payDate: { type: String },
  currency: { type: String, default: "Indian Rupees" },
  earnings: [{ name: String, amount: Number }],
  deductions: [{ name: String, amount: Number }],
});

export default mongoose.model("Payslip", payslipSchema);
