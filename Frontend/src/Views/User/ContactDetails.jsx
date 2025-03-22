import React, { useState, useEffect } from "react";
import Navbar from "./Usernavbar";
import axios from "axios";

const ContactDetails = () => {
  const [formData, setFormData] = useState({
    phone: "",
    phone2: "",
    email: "",
    state: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    // Fetch user contact details
    const fetchContactDetails = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/get-user-data", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/users/update-contact", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Contact details updated successfully!");
    } catch (error) {
      console.error("Error updating contact details", error);
      alert("Failed to update details!");
    }
  };

  return (
    <div className="bg-[#E3EDF9]">
      <Navbar />
      <div className="bg-white mt-6 ml-8 mr-8 flex space-x-8 text-gray-700 text-lg">
        <a href="#" className="p-4 ml-6 text-2xl hover:text-blue-500">
          Dashboard / Contact Details
        </a>
      </div>

      <div className="flex gap-4 h-screen mt-4 justify-center bg-[#E3EDF9]">
        <div className="w-3/4 max-w-4xl h-[80vh] rounded-lg flex">
          {/* Sidebar */}
          <div className="w-1/3 h-full border-r bg-gray-100 p-4">
            <ul className="space-y-4">
              <button className="w-full text-left p-4 rounded-lg bg-[#FFC107] text-black">
                Contact Details
              </button>
            </ul>
          </div>

          {/* Main Content */}
          <div className="ml-10 bg-[#E3EDF9] flex-1 p-6 pl-8 rounded-lg">
            <div className="max-w-lg mx-auto bg-white rounded-lg p-6 space-y-6 shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  {/* Phone Number 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number 1
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="px-2 py-4 mt-2 block w-full rounded-md border-gray-300 bg-[#F6F9FC] shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  {/* Phone Number 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number 2
                    </label>
                    <input
                      type="text"
                      name="phone2"
                      value={formData.phone2}
                      onChange={handleChange}
                      className="px-2 py-4 mt-2 block w-full rounded-md border-gray-300 bg-[#F6F9FC] shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  {/* E-mail Address */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      E-mail Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="px-2 py-4 mt-2 block w-full rounded-md border-gray-300 bg-[#F6F9FC] shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State of Residence
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="px-2 py-4 mt-2 block w-full rounded-md border-gray-300 bg-[#F6F9FC] shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="px-2 py-4 mt-2 block w-full rounded-md border-gray-300 bg-[#F6F9FC] shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  {/* Residential Address */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Residential Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="px-2 py-4 mt-2 block w-full rounded-md border-gray-300 bg-[#F6F9FC] shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      rows={3}
                    />
                  </div>
                </div>
                {/* Update Button */}
                <div className="mt-6 flex">
                  <button
                    type="submit"
                    className="bg-[#28A745] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#218838] focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
