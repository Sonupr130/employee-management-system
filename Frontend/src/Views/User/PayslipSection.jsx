
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config.js";

const PayslipSection = () => {
  const [payslips, setPayslips] = useState([]);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndPayslips = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in again.");
          return;
        }

        // const { data: userData } = await axios.get("http://localhost:5000/get-user-data", {
        const { data: userData } = await axios.get(`${config.backendUrl}/get-user-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userId = userData?._id;
        if (!userId) {
          setError("User ID not found.");
          return;
        }

        // const { data: payslipData } = await axios.get(`http://localhost:5000/api/payslips/${userId}`, {
        const { data: payslipData } = await axios.get(`${config.backendUrl}/api/payslips/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (payslipData.success) {
          setPayslips(payslipData.payslips);

          const uniqueYears = [
            ...new Set(payslipData.payslips.map((p) => p.period.split(" ")[1]))
          ];
          setYears(uniqueYears.sort());
          setSelectedYear(uniqueYears[0] || "");
        } else {
          setError("No payslips found.");
        }
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndPayslips();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const availableMonths = payslips
        .filter((p) => p.period.includes(selectedYear))
        .map((p) => {
          const [month, year] = p.period.split(" ");
          return month.trim(); // Normalize month names
        });
  
      const uniqueMonths = [...new Set(availableMonths)];
  
      // Sort months based on order instead of lexicographically
      const monthOrder = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      uniqueMonths.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
  
      setMonths(uniqueMonths);
      setSelectedMonth(uniqueMonths[0] || "");
    }
  }, [selectedYear, payslips]);
  

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const foundPayslip = payslips.find(
        (p) => p.period === `${selectedMonth} ${selectedYear}`
      );
      setSelectedPayslip(foundPayslip || null);
    }
  }, [selectedMonth, selectedYear]);


  

  return (
    <div className="bg-[#E3EDF9] min-h-screen">
      {/* <Navbar /> */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex space-x-4 mb-6">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border rounded"
          >
            {years.length ? (
              years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))
            ) : (
              <option>No Years Available</option>
            )}
          </select>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border rounded"
          >
            {months.length ? (
              months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))
            ) : (
              <option>No Months Available</option>
            )}
          </select>
        </div>

        {selectedPayslip ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6 text-white text-center">
              <div className="bg-blue-500 p-4 rounded-lg">
                ₹{selectedPayslip.totalEarnings}<br />Total Earnings
              </div>
              <div className="bg-yellow-500 p-4 rounded-lg">
                ₹{selectedPayslip.totalDeductions}<br />Total Deductions
              </div>
              <div className="bg-green-500 p-4 rounded-lg">
                ₹{selectedPayslip.netPay}<br />Net Pay
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-pink-400 p-4 rounded-lg">{selectedPayslip.period}<br />Period Name</div>
              <div className="bg-purple-400 p-4 rounded-lg">{new Date(selectedPayslip.payDate).toDateString()}<br />Pay Date</div>
              <div className="bg-blue-400 p-4 rounded-lg">{selectedPayslip.currency}<br />Currency</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Earnings</h3>
                {selectedPayslip.earnings.map((item) => (
                  <div key={item._id} className="flex justify-between border-b py-2">
                    <span>{item.name}</span>
                    <span className="font-semibold">₹{item.amount}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold mt-4">
                  <span>Total Earnings</span>
                  <span>₹{selectedPayslip.totalEarnings}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Deductions</h3>
                {selectedPayslip.deductions.map((item) => (
                  <div key={item._id} className="flex justify-between border-b py-2">
                    <span>{item.name}</span>
                    <span className="font-semibold">₹{item.amount}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold mt-4">
                  <span>Total Deductions</span>
                  <span>₹{selectedPayslip.totalDeductions}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">No payslips available.</p>
        )}
      </div>
    </div>
  );
};

export default PayslipSection;
