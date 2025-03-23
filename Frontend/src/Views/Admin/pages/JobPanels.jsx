import React, { useEffect, useState } from "react";
import axios from "axios";
import jhon from "../../../assets/Ellipse 8.png";
import gina from "../../../assets/Ellipse 13.png";
import loe from "../../../assets/Ellipse 14.png";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ViewProfile from "./ViewProfile";
import config from "../../../../config.js";

const JobPanels = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeView, setActiveView] = useState("table");
  const [actionDropdown, setActionDropdown] = useState(null);



  useEffect(() => {
    // Fetch employee count
    axios
      // .get("http://localhost:5000/users/employee-count")
      .get(`${config.backendUrl}/users/employee-count`)
      .then((response) => {
        setEmployeeCount(response.data.employeesCount);
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });

    // Fetch employee data
    axios
      // .get("http://localhost:5000/users")
      .get(`${config.backendUrl}/users`)
      .then((response) => {
        console.log("Fetched Employees:", response.data);
        const users = response.data.users; // Extract users directly
        setEmployees(users);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
    // fetch candidates data
    axios
      // .get("http://localhost:5000/candidates")
      .get(`${config.backendUrl}/candidates`)
      .then((response) => {
        console.log("Fetched Candidates:", response.data);
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
    // ✅ Fetch applied jobs from the API
    axios
      // .get("http://localhost:5000/getall")
      .get(`${config.backendUrl}/getall`)
      .then((response) => {
        console.log("Fetched Jobs:", response.data); // Debug response data
        setAppliedJobs(response.data);
      })

      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setAppliedJobs([]);
      });
  }, []);
  // Empty dependency array to run the effect once when the component mounts

  const payrolls = [
    { name: "John Doe", salary: "₦600,000", status: "Paid", logo: jhon },
    { name: "Ginna Loe", salary: "₦150,000", status: "Processing", logo: gina },
    { name: "James Foe", salary: "₦150,000", status: "Processing", logo: loe },
  ];

  const jobImages = {
    "Java": "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    "Data Analyst": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Data-icon.svg/512px-Data-icon.svg.png",
    "Project Manager": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Project-management-icon.png",
    "UI/UX Designer": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Adobe_XD_CC_icon.svg/512px-Adobe_XD_CC_icon.svg.png",
    "React Developer": "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "Marketing Specialist": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Digital_marketing_icon.png",
    "Sales Representative": "https://upload.wikimedia.org/wikipedia/commons/9/91/Sales-icon.png",
    "Cybersecurity Analyst": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Cybersecurity_icon.png/512px-Cybersecurity_icon.png",
    "AI Engineer": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Keras_logo.svg",
    "Product Manager": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Product_management_icon.png",
    "Devops Enginner": "https://www.guvi.in/blog/wp-content/uploads/2023/10/devops-logo-1200x675.webp",
    "Tester": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIhpW4XrteLxojOCPgZFmbaxLm1kXxnlhQRRcjHkYOBYEzAl8PoYTnk2b7VB4lmIF3620&usqp=CAU"
  };


  
  const handleDownloadPDF = (employeeId) => {
    axios
      // .get(`http://localhost:5000/users/${employeeId}`)
      .get(`${config.backendUrl}/users/${employeeId}`)
      .then((response) => {
        const employee = response.data;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Employee Details", 14, 20);

        // Employee Basic Details
        const employeeData = [
          ["First Name", employee.firstName],
          ["Last Name", employee.lastName],
          ["Email", employee.email || "N/A"],
          ["Phone", employee.phone || "N/A"],
          ["Phone 2", employee.phone2 || "N/A"],
          ["Job Title", employee.jobTitle || "N/A"],
          ["Department", employee.department || "N/A"],
          ["Category", employee.category || "N/A"],
          ["Address", employee.address || "N/A"],
          ["City", employee.city || "N/A"],
          ["State", employee.state || "N/A"],
        ];

        autoTable(doc, {
          startY: 30,
          head: [["Field", "Value"]],
          body: employeeData,
        });

        // Guarantor Details
        if (employee.guarantorDetails) {
          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Field", "Value"]],
            body: [
              ["Guarantor Name", employee.guarantorDetails.name || "N/A"],
              ["Position", employee.guarantorDetails.position || "N/A"],
              ["Phone", employee.guarantorDetails.phone || "N/A"],
            ],
          });
        }

        // Next of Kin Details
        if (employee.nextDetails) {
          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Field", "Value"]],
            body: [
              ["Next of Kin Name", employee.nextDetails.kinName || "N/A"],
              ["Relationship", employee.nextDetails.relationship || "N/A"],
              ["Phone", employee.nextDetails.phone || "N/A"],
              ["Address", employee.nextDetails.address || "N/A"],
            ],
          });
        }

        // Bank Details
        if (employee.bankDetails?.length > 0) {
          const bankData = employee.bankDetails
            .map((bank) => [
              ["Account Name", bank.accountName || "N/A"],
              ["Account Number", bank.accountNumber || "N/A"],
              ["Bank Name", bank.bankName || "N/A"],
              ["IFSC Code", bank.ifscCode || "N/A"],
              ["Account Type", bank.accountType || "N/A"],
            ])
            .flat();

          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Field", "Value"]],
            body: bankData,
          });
        }

        // Education Details
        if (employee.educationDetails?.academicRecords?.length > 0) {
          const educationDetails =
            employee.educationDetails.academicRecords.map((edu) => [
              edu.institute || "N/A",
              edu.course || "N/A",
              edu.department || "N/A",
              edu.location || "N/A",
              edu.startDate || "N/A",
              edu.endDate || "N/A",
              edu.description || "N/A",
            ]);

          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [
              [
                "Institute",
                "Course",
                "Department",
                "Location",
                "Start Date",
                "End Date",
                "Description",
              ],
            ],
            body: educationDetails,
          });
        }

        // Professional Details
        if (employee.educationDetails?.professionalDetails?.length > 0) {
          const professionalDetails =
            employee.educationDetails.professionalDetails.map((prof) => [
              prof.title || "N/A",
              prof.institute || "N/A",
              prof.startDate || "N/A",
              prof.endDate || "N/A",
              prof.description || "N/A",
            ]);

          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [
              ["Title", "Institute", "Start Date", "End Date", "Description"],
            ],
            body: professionalDetails,
          });
        }

        // Family Details
        if (employee.familyDetails?.length > 0) {
          const familyDetails = employee.familyDetails.map((family) => [
            family.name || "N/A",
            family.relationship || "N/A",
            family.phone || "N/A",
            family.address || "N/A",
          ]);

          autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Name", "Relationship", "Phone", "Address"]],
            body: familyDetails,
          });
        }

        // Save PDF
        doc.save(`${employee.firstName}_${employee.lastName}_Details.pdf`);
      })
      .catch((error) =>
        console.error("Error fetching employee details:", error)
      );
  };
  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setActiveView("view");
    setActionDropdown(null);
  };

   
  const renderContent = () => {
    switch (activeView) {
      case "view":
        return selectedEmployee && <ViewProfile employee={selectedEmployee} />;
      default:
        return (
          <div>
      <div className="flex space-x-6 mx-3 my-4 p-4 bg-[#E3EDF9]">
        {/* Messages */}
        <div className="bg-yellow-500 flex items-center justify-between text-white w-36 p-4 rounded-lg">
          <span className="material-icons text-4xl">email</span>
          <div>
            <p className="text-2xl font-bold">138</p>
            <p className="text-sm">Messages</p>
          </div>
        </div>

        {/* Jobs */}
        <div className="bg-blue-600 flex items-center justify-between text-white w-36 p-4 rounded-lg">
          <span className="material-icons text-4xl">work</span>
          <div>
            <p className="text-2xl font-bold">50</p>
            <p className="text-sm">Jobs</p>
          </div>
        </div>

        {/* Candidates */}
        <div className="bg-green-600 flex items-center justify-between text-white w-36 p-4 rounded-lg">
          <span className="material-icons text-4xl">people</span>
          <div>
            <p className="text-2xl font-bold">100</p>
            <p className="text-sm">Candidates</p>
          </div>
        </div>

        {/* Resumes */}
        <div className="bg-gray-800 flex items-center justify-between text-white w-36 p-4 rounded-lg">
          <span className="material-icons text-4xl">description</span>
          <div>
            <p className="text-2xl font-bold">50</p>
            <p className="text-sm">Resumes</p>
          </div>
        </div>

        {/* Employees */}
        <div className="bg-yellow-600 flex items-center justify-between text-white w-36 p-4 rounded-lg">
          <span className="material-icons text-4xl">person</span>
          <div>
            <p className="text-2xl font-bold">{employeeCount}</p>
            <p className="text-sm">Employees</p>
          </div>
        </div>

        {/* Leaves */}
        <div className="bg-blue-500 flex items-center justify-between text-white w-36 p-4 rounded-lg">
          <span className="material-icons text-4xl">menu_book</span>
          <div>
            <p className="text-2xl font-bold">20</p>
            <p className="text-sm">Leaves</p>
          </div>
        </div>

        {/* Payrolls */}
        <div className="bg-green-500 flex items-center justify-between text-white w-36 p-4 rounded-lg">
          <span className="material-icons text-4xl">attach_money</span>
          <div>
            <p className="text-2xl font-bold">200</p>
            <p className="text-sm">Payrolls</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 w-[80vw] h-[90vh]">
        {/* Applied Jobs */}
        <div className="rounded-lg bg-white shadow p-4 max-w-full overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Applied Jobs</h2>
          <ul className="space-y-3">
            {appliedJobs.length > 0 ? ( // ✅ No more "undefined.length" error
              appliedJobs.map((job, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3 overflow-auto">
                    <img
                      src={
                        jobImages[job.title] ||
                        "https://t4.ftcdn.net/jpg/08/74/14/13/360_F_874141335_gJ0rrCK1WY8kBufqjvxUSMChfef923cT.jpg"
                      }
                      alt="Logo"
                      className="w-11 h-11  rounded-md overflow-auto"
                    />
                    <div>
                      <h3 className="text-gray-800 font-medium">{job.title}</h3>
                      <p className="text-gray-500 text-sm">Kris </p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {job.postedDate || "N/A"}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No applied jobs found.</p>
            )}
          </ul>
        </div>

        {/* Employees */}

        <div className="bg-white rounded-lg shadow p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Employees</h2>
          <ul className="space-y-3">
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={employee.profilePic || "/path-to-placeholder.png"}
                      alt={`${employee.firstName} ${employee.lastName}'s avatar`}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="text-gray-800 font-medium">
                        {`${employee.firstName} ${employee.lastName}`}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Role: {employee.jobTitle || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleViewProfile(employee)} className="bg-blue-500 text-white p-2 rounded-lg">
                      View
                    </button>
                    <button onClick={() => handleDownloadPDF(employee._id)} className="bg-green-500 text-white p-2 rounded-lg">
                      Download
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No employees found.</p>
            )}
          </ul>
        </div>

        {/* Candidates */}
        <div className="bg-white rounded-lg shadow p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Candidates</h2>
          <ul className="space-y-3">
            {candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {/* <img
                      src={candidate.profilePic || "/path-to-placeholder.png"}
                      alt={`${candidate.name}'s avatar`}
                      className="w-10 h-10 rounded-full"
                    /> */}
                    <div>
                      <h3 className="text-gray-800 font-medium">
                        {candidate.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Applied for: {candidate.jobTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm p-1 rounded-lg ${
                        candidate.atsScore > 50
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      ATS Score: {candidate.atsScore} 
                    </span>
                    <button className="bg-blue-500 text-white p-2 rounded-lg">
                      View
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No candidates found.</p>
            )}
          </ul>
        </div>

        {/* April Payrolls */}
        <div className="bg-white rounded-lg shadow p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">April Payrolls</h2>
          <ul className="space-y-3">
            {payrolls.map((payroll, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={payroll.logo}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-gray-800 font-medium">
                      {payroll.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Salary Amount: {payroll.salary}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`p-1 rounded-lg text-sm ${
                      payroll.status === "Paid"
                        ? "bg-green-100 text-green-500"
                        : "bg-yellow-100 text-yellow-500"
                    }`}
                  >
                    {payroll.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
          
        );
    }
  };



  return (
    // <div className="flex min-h-screen bg-[#E3EDF9]">
    <div className="flex min-h-screen overflow-hidden bg-[#E3EDF9] overflow-y-auto ">
      <div className="flex-1 ">
        <div className="p-2  h-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default JobPanels;
