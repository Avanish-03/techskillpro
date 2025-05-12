import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    roleId: 2, // default: Student
    profileImage: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      FullName: form.fullName,
      Email: form.email,
      Password: form.password,
      RoleID: parseInt(form.roleId),
      ProfileImage: form.profileImage || ''
    };

    try {
      const res = await axios.post('http://localhost:5269/api/Auth/signup', payload);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setError(err.response?.data || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
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
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
          <select
            name="roleId"
            value={form.roleId}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md"
          >
            <option value={2}>Student</option>
            <option value={3}>Teacher</option>
          </select>
          <input
            type="text"
            name="profileImage"
            placeholder="Profile Image URL (optional)"
            value={form.profileImage}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Register
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <a href="/Login" className="text-blue-600 underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
