import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import config from "../../../../config.js";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/candidates");
        const response = await axios.get(`${config.backendUrl}/candidates`);
        setCandidates(response.data);
      } catch (err) {
        setError("Failed to fetch candidates. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadCandidates();
  }, []);

  const roles = ["All", ...new Set(candidates.map((c) => c.jobTitle))];
  const filteredCandidates = selectedRole === "All" ? candidates : candidates.filter((c) => c.jobTitle === selectedRole);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString();

    
    doc.text(`Candidates for ${selectedRole}`, 14, 25);
    doc.setFontSize(10);
    doc.text(`Exported on: ${currentDate}`, 14, 16);
  
   

    const tableColumn = ["Name", "Email", "Phone", "Location"];
    const tableRows = filteredCandidates.map(({ name, email, phone, jobLocation }) => [name, email, phone, jobLocation]);
    autoTable(doc, { startY: 40, head: [tableColumn], body: tableRows });
    
    doc.save(`Candidates_${selectedRole}.pdf`);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCandidates.map(({ name, email, phone, jobTitle, jobLocation }) => ({
      Name: name,
      Email: email,
      Phone: phone,
      Role: jobTitle,
      Location: jobLocation,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    XLSX.writeFile(workbook, `Candidates_${selectedRole}.xlsx`);
  };

  const printTable = () => {
    const printContent = document.getElementById("print-area").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Candidates</h2>

      {/* Filter and Export Section */}
      <div className="mb-4 flex gap-4">
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border rounded"
        >
          {roles.map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>
        <button onClick={exportToPDF} className="px-4 py-2 bg-blue-500 text-white rounded">Export PDF</button>
        <button onClick={exportToExcel} className="px-4 py-2 bg-purple-500 text-white rounded">Export Excel</button>
        <button onClick={printTable} className="px-4 py-2 bg-green-500 text-white rounded">Print</button>
      </div>

      {/* Candidates Table */}
      {loading ? (
        <p>Loading candidates...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div id="print-area" className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Resume</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{candidate.name}</td>
                  <td className="py-2 px-4 border">{candidate.email}</td>
                  <td className="py-2 px-4 border">{candidate.phone}</td>
                  <td className="py-2 px-4 border">
                    <a
                      href={candidate.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="py-2 px-4 border">{candidate.jobTitle}</td>
                  <td className="py-2 px-4 border">{candidate.jobLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Candidates;
