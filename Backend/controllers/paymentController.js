// import dotenv from "dotenv";
// import Mailjet from "node-mailjet";


// dotenv.config();
// // Configure Mailjet with API keys
// const mailjetClient = Mailjet.apiConnect(
//     process.env.MAILJET_API_KEY,
//     process.env.MAILJET_API_SECRET
//   );

// export const sendPaymentSuccessEmail = async (user, amount) => {
//   try {
//     const request = mailjetClient.post("send", { version: "v3.1" }).request({
//       Messages: [
//         {
//           From: {
//             Email: process.env.MAILJET_FROM_EMAIL,
//             Name: "Kris Software Consultancy",
//           },
//           To: [
//             {
//               Email: user.email,
//               Name: `${user.firstName} ${user.lastName}`,
//             },
//           ],
//           Subject: "Payment Received Successfully",
//           HTMLPart: `
//   <div style="background-color:#f4f4f4; padding:20px; font-family:Arial, sans-serif;">
//     <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.1); overflow:hidden;">
//       <div style="background-color:#1e3a8a; padding:20px; text-align:center;">
//         <h1 style="color:#ffffff; margin:0;">Kris Software Consultancy</h1>
//       </div>
//       <div style="padding:20px;">
//         <h2 style="color:#1e3a8a;">Hello ${user.firstName},</h2>
//         <p style="font-size:16px; color:#555555;">
//           Your salary payment of <strong>₹${amount}</strong> has been successfully processed.
//         </p>
//         <p style="font-size:14px; color:#888888; text-align:center;">
//           If you have any questions, please contact HR.
//         </p>
//       </div>
//       <div style="background-color:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#aaaaaa;">
//         © 2025 Kris Software Consultancy. All rights reserved.
//       </div>
//     </div>
//   </div>
// `,
//         },
//       ],
//     });

//     await request;
//     console.log("Payment success email sent to:", user.email);
//   } catch (error) {
//     console.error("Error sending payment success email:", error);
//   }
// };


import dotenv from "dotenv";
import Mailjet from "node-mailjet";
import Payslip from "../models/payslipSchema.js"; // Import Payslip Model
import mongoose from "mongoose";

dotenv.config();
// Configure Mailjet with API keys
const mailjetClient = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
);

export const sendPaymentSuccessEmail = async (user, amount, bankName, accountNumber) => {
  try {
    // const lastFourDigits = accountNumber.slice(-4);
    const lastFourDigits = accountNumber ? accountNumber.slice(-4) : "XXXX";
    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: "Kris Software Consultancy",
          },
          To: [
            {
              Email: user.email,
              Name: `${user.firstName} ${user.lastName}`,
            },
          ],
          Subject: "KRIS Software Consultancy: Payment Credited",
          HTMLPart: `
  <div style="background-color:#f4f4f4; padding:20px; font-family:Arial, sans-serif;">
    <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.1); overflow:hidden;">
      <div style="background-color:#1e3a8a; padding:20px; text-align:center;">
        <h1 style="color:#ffffff; margin:0;">Kris Software Consultancy</h1>
      </div>
      <div style="padding:20px;">
        <h2 style="color:#1e3a8a;">Hello ${user.firstName},</h2>
        <p style="font-size:16px; color:#555555;">
          We would like to inform you that an amount of <strong style="color:#3137fd;">₹${amount}</strong> has been successfully credited to your ${bankName} Account XXXX-XXXX-${lastFourDigits} from Kris Software Consultancy.
        </p>
        <p style="font-size:14px; color:#888888; text-align:center;">
          If you have any questions, please contact HR.
        </p>
      </div>
      <div style="background-color:#f4f4f4; padding:15px; text-align:center; font-size:12px; color:#aaaaaa;">
        © 2025 Kris Software Consultancy. All rights reserved.
      </div>
    </div>
  </div>
`,
        },
      ],
    });

    await request;
    console.log("Payment success email sent to:", user.email);
  } catch (error) {
    console.error("Error sending payment success email:", error);
  }
};




export const processPayout = async (req, res) => {
  try {
    const { amount, userId, bankDetails } = req.body;

    // Simulating payout processing
    console.log("Processing payout for user:", userId);

    // Sample breakdown of earnings and deductions
    const payslip = new Payslip({
      userId,
      totalEarnings: amount,
      totalDeductions: 50, // Example deduction
      netPay: amount - 100,
      period: "February 2025",
      payDate: new Date(),
      earnings: [
        { name: "Basic Pay", amount: amount * 0.6 },
        { name: "Allowance", amount: amount * 0.3 },
      ],
      deductions: [{ name: "Tax", amount: 50 }],
    });

    await payslip.save();

    res.json({ success: true, message: "Payout successful", payslip });
  } catch (error) {
    console.error("Payout error:", error);
    res.status(500).json({ success: false, message: "Payout failed" });
  }
};


// Fetch payslips for a specific user
export const getPayslipsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Check if userId exists
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // ✅ Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" });
    }

    // ✅ Query MongoDB for payslips
    const payslips = await Payslip.find({ userId });

    // ✅ Handle case where no payslips are found
    if (payslips.length === 0) {
      return res.status(404).json({ success: false, message: "No payslips found for this user" });
    }

    res.json({ success: true, payslips });
  } catch (error) {
    console.error("Error fetching payslips:", error);
    res.status(500).json({ success: false, message: "Error fetching payslips" });
  }
};
