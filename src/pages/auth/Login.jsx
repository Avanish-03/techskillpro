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
      console.log('Sending login payload:', payload);
      const res = await axios.post('http://localhost:5269/api/Auth/login', payload);

      const { token, fullName, email, roleId } = res.data;

      // Check what we received
      console.log("Login response:", res.data);

      // ✅ Ensure roleId is a number
      const role = parseInt(roleId);

      if (!role || isNaN(role)) {
        setError('Invalid role received from server.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ fullName, email, roleId }));

      // ✅ Final Role-Based Redirection
      if (role === 2) {
        navigate('/student/dashboard');
      } else if (role === 3) {
        navigate('/teacher/dashboard');
      } else if (role === 1) {
        setError('Admins are not allowed to login from here.');
      } else {
        setError('Unknown role. Access denied.');
      }

    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
