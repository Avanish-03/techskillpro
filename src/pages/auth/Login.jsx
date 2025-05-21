import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Email: form.email,
      Password: form.password,
    };

    try {
      const res = await axios.post('http://localhost:5269/api/Auth/login', payload);
      const { token, fullName, email, roleId, userID } = res.data;

      const role = parseInt(roleId);
      if (!role || isNaN(role)) {
        setError('Invalid role received from server.');
        return;
      }

      localStorage.setItem('userID', userID);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ fullName, email, roleId }));

      if (role === 2) navigate('/student/dashboard');
      else if (role === 3) navigate('/teacher/dashboard');
      else if (role === 1) navigate('/admin/dashboard');
      else setError('Unknown role. Access denied.');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/blue-pink-purple-abstract-wallpaper-vivid-light-glow-elements-modern-minimalist-digital-wallpaper_657790-27532.jpg?ga=GA1.1.888906034.1724490662&semt=ais_hybrid&w=740')` }}>
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg flex overflow-hidden w-[90%] max-w-4xl">
        {/* Illustration Panel */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-6">
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
            <p className="mt-4 text-center text-gray-600">
              Don’t have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
