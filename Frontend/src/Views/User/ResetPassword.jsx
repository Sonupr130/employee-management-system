import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import logo from "../../assets/kris logo 3.svg";
import config from '../../../config.js';

const ResetPassword = () => {
  const { resetPasswordToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log('Token from URL:', resetPasswordToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resetPasswordToken) {
        setError('Token is missing or invalid.');
        return;
      }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
    // const response = await axios.post(`http://localhost:5000/user/reset-password/${resetPasswordToken}`, { newPassword });
    const response = await axios.post(`${config.backendUrl}/user/reset-password/${resetPasswordToken}`, { newPassword });
      setMessage(response.data.message);
      console.log(response);
      setError('');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setMessage('');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-600 to-zinc-300 ">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
        <div className='flex items-center justify-center'>
            <img className="w-36" src={logo} alt="kris logo" />
        </div>
        <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-blue-800">Reset Password</h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mt-2 mb-3">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mt-2 mb-3">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Confirm new password"
              required
            />
          </div>
          <button type="submit" className="mt-3 w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;