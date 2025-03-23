import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/kris logo 2.svg"; // Path to your logo image
import dp from "../assets/dp 1.png";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { UserPen, UserPlus } from "lucide-react";
import config from "../../config.js";

const AdminSideNavbar = () => {
  const [profilePic, setProfilePic] = useState(
    "https://i.pinimg.com/1200x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg"
  );
  const imageInputRef = useRef(null);
  const location = useLocation();

  const [admin, setAdmin] = useState(null); // State to store admin data
  const [adminId, setAdminId] = useState(null); // State to store admin ID

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/admin");
        const response = await axios.get(`${config.backendUrl}/admin`);
        console.log("API Response:", response.data.admins[0]._id);

        if (response.data.admins && response.data.admins.length > 0) {
          const firstAdmin = response.data.admins[0];
          setAdmin(firstAdmin);
          setAdminId(firstAdmin._id);

          // Fetch profile image after setting adminId
          const imageResponse = await axios.get(
            // `http://localhost:5000/admin/profile-image/${firstAdmin._id}`
           `${config.backendUrl}/admin/profile-image/${firstAdmin._id}`
          );

          if (imageResponse.data.imageUrl) {
            setProfilePic(imageResponse.data.imageUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching admin data or profile image:", error);
      }
    };

    fetchAdminData();
  }, []); // ✅ Runs only once when the component mounts

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  // Handle image selection
  const handleImageChange = async (e) => {
    console.log("ADMIN ID before upload:", adminId);

    if (!adminId) {
      alert("Admin ID is missing. Cannot upload image.");
      return;
    }

    const file = e.target.files[0];
    if (file) {
      await uploadToBackend(file, adminId);
    }
  };

  const uploadToBackend = async (file, adminId) => {
    const formData = new FormData();
    formData.append("file", file); // Attach the file

    try {
      const response = await axios.post(
        // `http://localhost:5000/admin/upload-profile/${adminId}`,
        `${config.backendUrl}/admin/upload-profile/${adminId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // Set proper headers
      );

      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchProfileImage = async () => {
    if (!adminId) return;

    try {
      const response = await axios.get(
        // `http://localhost:5000/admin/profile-image/${adminId}`
       `${config.backendUrl}/admin/profile-image/${adminId}`
      );
      setProfilePic(response.data.imageUrl);
    } catch (error) {
      console.log(
        "Error fetching profile image:",
        error.response?.data || error.message
      );
    }
  };

  const handleLogout = async () => {
    try {
      // await axios.post("http://localhost:5000/admin/logout");
      await axios.post(`${config.backendUrl}/admin/logout`);

      // Clear authentication token and user data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Redirect to login page
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col w-64 h-auto bg-blue-900 text-white shadow-md">
      <img
        className="w-[193px] h-[52px] top-[7px] left-[67px] gap-0 opacity-100"
        src={logo}
        alt="Logo"
      />
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20">
        <div className="flex justify-center relative">
          <div className="rounded-full bg-yellow-400 w-20 h-20 flex items-center justify-center overflow-hidden">
            <img className="w-20 h-20" src={profilePic} alt="Profile" />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="absolute translate-x-9 translate-y-2 bg-slate-800 rounded-full p-1">
            <UserPen
              onClick={handleImageClick}
              className="cursor-pointer"
              size={15}
            />
          </div>
        </div>
        <div className="ml-4">
          {/* <h2 className="text-xl font-semibold">{admin.firstName} {admin.lastName}</h2> */}
          {admin ? (
            <>
              <h2 className="text-xl font-semibold">
                {admin.firstName} {admin.lastName}
              </h2>
              <p className="text-sm">Admin</p>
            </>
          ) : (
            <p className="text-sm">Loading...</p>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col mt-6 pl-3">
        <NavLink
          to="/admin/dashboard/"
          className={`flex items-center p-2 mb-2 rounded-lg ${
            location.pathname === "/admin/dashboard/"
              ? "bg-yellow-400 text-black"
              : "hover:bg-blue-800"
          }`}
        >
          <span className="material-icons">dashboard</span>
          <span className="ml-2">Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/dashboard/messages"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-lg ${
              isActive ? "bg-yellow-400 text-black" : "hover:bg-blue-800"
            }`
          }
        >
          <span className="material-icons">mail</span>
          <span className="ml-2">Messages</span>
        </NavLink>
        <h3 className="mt-4 mb-2 font-semibold">Recruitment</h3>
        <NavLink
          to="/admin/dashboard/jobportal"
          className={`flex items-center p-2 mb-2 rounded-lg ${
            location.pathname === "/admin/dashboard/jobportal"
              ? "bg-yellow-400 text-black"
              : "hover:bg-blue-800"
          }`}
        >
          <span className="material-icons">work</span>
          <span className="ml-2">Jobs</span>
        </NavLink>
        <NavLink
          to="/admin/dashboard/candidates"
          className={`flex items-center p-2 mb-2 rounded-lg ${
            location.pathname === "/admin/dashboard/candidates"
              ? "bg-yellow-400 text-black"
              : "hover:bg-blue-800"
          }`}
        >
          <span className="material-icons">group</span>
          <span className="ml-2">Candidates</span>
        </NavLink>
        {/* <NavLink
          to="/admin/dashboard/"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-lg ${
              isActive ? "bg-yellow-400 text-black" : "hover:bg-blue-800"
            }`
          }
        >
          <span className="material-icons">description</span>
          <span className="ml-2">Resumes</span>
        </NavLink> */}
        <h3 className="mt-4 mb-2 font-semibold">Organization</h3>
        <NavLink
          to="/admin/dashboard/employee-management"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-lg ${
              isActive ? "bg-yellow-400 text-black" : "hover:bg-blue-800"
            }`
          }
        >
          <span className="material-icons">people</span>
          <span className="ml-2">Employee Management</span>
        </NavLink>
        <NavLink
          to="/admin/dashboard/leave-management"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-lg ${
              isActive ? "bg-yellow-400 text-black" : "hover:bg-blue-800"
            }`
          }
        >
          <span className="material-icons">book</span>
          <span className="ml-2">Leave Management</span>
        </NavLink>
        <NavLink
          to="/admin/dashboard/add-employee"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-lg ${
              isActive ? "bg-yellow-400 text-black" : "hover:bg-blue-800"
            }`
          }
        >
          <UserPlus />
          <span className="ml-2">Add Employee</span>
        </NavLink>
        <NavLink
          to="/admin/dashboard/performance-management"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-lg ${
              isActive ? "bg-yellow-400 text-black" : "hover:bg-blue-800"
            }`
          }
        >
          <span className="material-icons">assessment</span>
          <span className="ml-2">Performance Management</span>
        </NavLink>
        <h3 className="mt-4 mb-2 font-semibold">KRIS Pay</h3>
        <NavLink
          to="/admin/dashboard/payroll"
          className={({ isActive }) =>
            `flex items-center p-2 mb-2 rounded-lg ${
              isActive ? "bg-yellow-400 text-black" : "hover:bg-blue-800"
            }`
          }
        >
          <span className="material-icons">attach_money</span>
          <span className="ml-2">Payroll Management</span>
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="mt-auto mb-4 pl-4 pr-4">
        <button
          className="flex items-center justify-center w-full h-12 bg-red-500 rounded-lg"
          onClick={handleLogout}
        >
          <span className="material-icons">logout</span>
          <span className="ml-2">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSideNavbar;
