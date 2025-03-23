import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { UserPen } from 'lucide-react';
import config from "../../../config.js";

const Personaldetails = () => {
  const [profilePic, setProfilePic] = useState("https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg");//encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvtLcEbK72DdI2-0yjNOHLvzQeJqLRKhirxA&s");
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);
  const [userName, setUserName] = useState(""); 
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;
  const token = localStorage.getItem("token");

  

  // Handle image selection
  const handleImageChange = async (e) => {
    // console.log("User ID before upload:", userId);
    
    if (!userId) {
      alert("User ID is missing. Cannot upload image.");
      return;
    }

    const file = e.target.files[0];
    if (file) {
      await uploadToBackend(file);
    }
  };



  const uploadToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post(
        // `http://localhost:5000/upload-profile/${userId}`,
        `${config.backendUrl}/upload-profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error.message);
    }
  };
  
  // Fetch profile image from backend
 
 
 
 
  
  const fetchProfileImage = async () => {
    if (!userId) return;

    try {
      // const response = await axios.get(`http://localhost:5000/profile-image/${userId}`);
      const response = await axios.get(`${config.backendUrl}/profile-image/${userId}`);
      setProfilePic(response.data.imageUrl); // Set the Base64 image
    } catch (error) {
      console.error("Error fetching profile image:", error.response?.data || error.message);
    }
  };

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const userResponse = await axios.get("http://localhost:5000/get-user-data", {
        const userResponse = await axios.get(`${config.backendUrl}/get-user-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, jobTitle, department, category } = userResponse.data || {};

        setUserName(name || "Username");
        setJobTitle(jobTitle || "Job Title");
        setDepartment(department || "Department");
        setCategory(category || "Fulltime");

        fetchProfileImage(); // Fetch profile image
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
    fetchProfileImage();
  }, [token, userId]);

  // Trigger file input when profile image is clicked
  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="max-w-full w-full px-10 mx-auto bg-white rounded-lg p-6 space-y-8 shadow-lg">

      <div className="max-w-md mx-auto bg-white rounded-lg p-6">
        <div className="flex justify-center mb-4 relative">
          <div className="w-36 h-36 relative rounded-full bg-yellow-300 flex items-center justify-center text-3xl font-bold text-white cursor-pointer">
            <img src={profilePic} alt="" className="rounded-full h-full w-full object-cover" />
          </div>
            <div className="absolute translate-x-14 bg-slate-200 rounded-full p-2">
            <UserPen onClick={handleImageClick} className="cursor-pointer" size={28} />
            </div>
        </div>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {loading && <div>Uploading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        <div className="mt-5 text-center space-y-4">
          <div className="text-3xl font-semibold">{userName}</div>
          <div className="pt-6">
          <div className="text-lg text-gray-500">Department</div>
          <div className="text-black font-semibold text-xl">{department}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-10">
              <div className="text-lg text-gray-500">Job Title</div>
              <div className="text-lg font-semibold">{jobTitle}</div>
            </div>
            <div className="mt-10">
              <div className="text-lg text-gray-500">Job Category</div>
              <div className="text-lg font-semibold">{category}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personaldetails;








