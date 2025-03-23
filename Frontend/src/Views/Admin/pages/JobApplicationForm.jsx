import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../../config.js";

const JobApplicationForm = () => {
  const { jobLink } = useParams(); // Get jobLink from URL
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeLink: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:5000/apply-job/${encodeURIComponent(jobLink)}`
          `http://localhost:5000/apply-job/${encodeURIComponent(jobLink)}`
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setMessage("Error fetching job details.");
      }
    };

    fetchJobDetails();
  }, [jobLink]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phone", formData.phone);
    formDataToSubmit.append("resumeLink", formData.resumeLink);

    try {
      const response = await axios.post(
        // `http://localhost:5000/apply/${job._id}`,
       `${config.backendUrl}/apply/${job._id}`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error submitting application");
      console.error(error);
    }
  };

  if (!job) return <div>Loading job details...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold">
        Apply for {job.title} at {job.company}
      </h1>
      <p>{job.location}</p>
      <p>Job type: {job.type}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Resume Link(GoogleDrive)</label>
          <input
            type="text"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Application
        </button>
      </form>

      {message && <div className="mt-4 text-sm text-gray-600">{message}</div>}
    </div>
  );
};

export default JobApplicationForm;




