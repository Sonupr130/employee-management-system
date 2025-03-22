import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import meeting from "../../assets/meeting.png"; // Path to your background image
import logo from "../../assets/kris logo 2.svg"; // Path to your logo image
import axios from "axios";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/admin/login", { email, password });
      localStorage.setItem("token", data.token); // Store token
      navigate("/admin/login/AdminDashboard"); // Redirect to Admin Dashboard
      console.log(data); 
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
    }
  };

  

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${meeting})` }}
    >
      {/* Bluish Overlay */}
      <div className="absolute inset-0 bg-blue-950 opacity-90 z-0"></div>

      {/* Semi-transparent overlay box */}
      <div className="bg-blue-950 shadow-black bg-opacity-90 p-10 rounded-lg shadow-2xl max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          {/* Logo */}
          <img
            src={logo}
            alt="Kris Logo"
            className="mx-auto mb-6 w-24"
          />
          {/* Title and Description */}
          <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
          <p className="text-gray-300">Login to your account.</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-semibold mb-2"
            >
              E-mail Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Remember Me and Reset Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-white">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Remember me</span>
            </label>
            <a
              href="#"
              className="text-yellow-400 hover:text-yellow-300 text-sm"
            >
              Reset Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="p-4 w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
