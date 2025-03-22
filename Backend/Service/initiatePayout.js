import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const initiatePayout = async (employee) => {
  const payoutData = {
    account_number: process.env.RAZORPAYX_ACCOUNT_NUMBER,
    fund_account: {
      account_type: "bank_account",
      bank_account: {
        name: employee.bankDetails.accountName,
        ifsc: employee.bankDetails.ifscCode,
        account_number: employee.bankDetails.accountNumber,
      },
      contact: {
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        contact: employee.phone,
        type: "employee"
      }
    },
    amount: employee.salary * 100, // amount in paise
    currency: "INR",
    mode: "IMPS",
    purpose: "salary",
    queue_if_low_balance: true,
    reference_id: `PAY-${employee._id}`,
    narration: `Salary for ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`
  };

  const response = await razorpay.payouts.create(payoutData);
  return response;
};
