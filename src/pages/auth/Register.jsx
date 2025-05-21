import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    roleId: 2,
    profileImage: null
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, profileImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = new FormData();
    payload.append('FullName', form.fullName);
    payload.append('Email', form.email);
    payload.append('Password', form.password);
    payload.append('RoleID', parseInt(form.roleId));
    if (form.profileImage) {
      payload.append('ProfileImage', form.profileImage);
    }

    try {
      const res = await axios.post('http://localhost:5269/api/Auth/signup', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/blue-pink-purple-abstract-wallpaper-vivid-light-glow-elements-modern-minimalist-digital-wallpaper_657790-27532.jpg?ga=GA1.1.888906034.1724490662&semt=ais_hybrid&w=740')` }}>
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg flex overflow-hidden w-[90%] max-w-4xl">
        {/* Register Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h2>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={2}>Student</option>
              <option value={3}>Teacher</option>
            </select>

            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">Login</a>
            </p>
          </form>
        </div>

        {/* Illustration Panel */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-6">
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
