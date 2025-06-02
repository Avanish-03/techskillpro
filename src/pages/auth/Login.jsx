import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// import { hashPassword } from '../../utils/hash';
import { loginUser } from '../../services/authService';

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      Email: form.email,
      Password: form.password,
    };

    try {
      const { token, user } = await loginUser(payload);

      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      login(user, token);

      const roleRoutes = {
        Student: '/student/dashboard',
        Teacher: '/teacher/dashboard',
        Admin: '/admin/dashboard',
      };
      const redirectPath = roleRoutes[user.roleName];
      console.log(user.roleName);
      
      console.log(redirectPath);
      
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        setError('Unknown role. Access denied.');
      }

    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/blue-pink-purple-abstract-wallpaper-vivid-light-glow-elements-modern-minimalist-digital-wallpaper_657790-27532.jpg')` }}>
      <div className="bg-white bg-opacity-90 shadow-xl rounded-lg flex overflow-hidden w-[90%] max-w-4xl">
        <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-6">
          <img src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif" alt="Illustration" className="max-w-full h-auto" />
        </div>
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
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Logging in...' : 'Login'}
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
