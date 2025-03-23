import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/kris logo 3.svg";
import bgImage from "../../assets/backgd.jpg";
import config from '../../../config.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:5000/user/forgot-password', { email });
      const response = await axios.post(`${config.backendUrl}/user/forgot-password`, { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-600 to-zinc-300 ">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
        <div className=' flex items-center justify-center'>
            <img className="w-36" src={logo} alt="kris logo" />
        </div>
        <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-blue-800">Forgot Password</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mt-2 mb-3">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="mt-3 w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
