import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/kris logo 3.png";
import config from "../../../../config.js";

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: "",
  });
  const [isApplied, setIsApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/job/${jobId}`);
        const response = await axios.get(`${config.backendUrl}/job/${jobId}`);
        setJobDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedPhone = formData.phone.trim().slice(0, 10);

    try {
      // const response = await axios.post(`http://localhost:5000/jobs/apply/${jobId}`, {
      const response = await axios.post(`${config.backendUrl}/jobs/apply/${jobId}`, {
        ...formData,
        phone: formattedPhone,
      });

      console.log("Application submitted: ", response.data);

      if (response.status === 201) {
        setIsApplied(true);
        setShowModal(true);
        setFormData({ name: "", email: "", phone: "", resumeLink: "" });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setShowModal(false);
    }
  };

  if (!jobDetails) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-lg mt-8 border border-gray-200">
      <div className="flex justify-between border-b pb-3 items-center">
        <h2 className="text-3xl font-bold text-gray-800 pb-3">{jobDetails.title}</h2>
        <img className="h-12" src={logo} alt="" />
      </div>
      <div className="mt-4 space-y-2 text-gray-600">
        <p><span className="font-semibold">Company:</span> {jobDetails.company}</p>
        <p><span className="font-semibold">Type:</span> {jobDetails.type}</p>
        <p><span className="font-semibold">Location:</span> {jobDetails.location}</p>
        <p><span className="font-semibold">Posted:</span> {jobDetails.postedDate}</p>
        <p><span className="font-semibold">Job Description: </span>{jobDetails.description}</p>
      </div>

      {isApplied ? (
        <div className="text-center mt-6 text-green-600 font-semibold">
          Thank you! We will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Apply for this job</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring focus:ring-blue-300" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring focus:ring-blue-300" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring focus:ring-blue-300" maxLength="10" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Resume Link (Google Drive)</label>
            <input type="text" name="resumeLink" value={formData.resumeLink} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring focus:ring-blue-300" />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold">
            Submit Application
          </button>
        </form>
      )}

      {showModal && (
        <div id="modal-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={handleCloseModal}>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
          <div className="text-6xl text-green-500 mb-4">✔️</div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Thank you!</h3>
            <p className="mb-4 text-gray-600">We will get back to you soon.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
