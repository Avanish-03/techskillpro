import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut } from 'lucide-react';
import adminImg from '../../assets/images/Avanish.jpeg'
import {
  Home, Users, Shield, Layers, BookOpen, HelpCircle,
  BarChart3, MessageCircle, Bell, User
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const navLinks = [
    { path: '/admin/dashboard/home', icon: <Home size={18} />, label: 'Dashboard' },
    { path: '/admin/dashboard/users', icon: <Users size={18} />, label: 'Users' },
    { path: '/admin/dashboard/categories', icon: <Layers size={18} />, label: 'Categories' },
    { path: '/admin/dashboard/quiz', icon: <BookOpen size={18} />, label: 'Quiz' },
    // { path: '/admin/dashboard/questions', icon: <HelpCircle size={18} />, label: 'Questions' },
    { path: '/admin/dashboard/attempts', icon: <BarChart3 size={18} />, label: 'Quiz Attempts' },
    { path: '/admin/dashboard/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
    { path: '/admin/dashboard/feedback', icon: <MessageCircle size={18} />, label: 'Feedback' },
    { path: '/admin/dashboard/notifications', icon: <Bell size={18} />, label: 'Notifications' },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-gray-200 dark:bg-gray-700' : '';
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 text-2xl font-bold border-b dark:border-gray-700">Admin Panel</div>
        <nav className="p-4 space-y-2">
          {navLinks.map((link, index) => (
            <div
              key={index}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${isActiveLink(link.path)}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </div>
          ))}
          {/* Logout */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Log Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-xl font-semibold">Welcome Admin To <span className="font-extrabold dark:text-blue-400">TechSkillPro</span></h1>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Avatar */}
            <div className="relative group">
              <img
                src={adminImg}
                alt="Admin"
                className="w-10 h-10 rounded-full border cursor-pointer"
              />
            </div>
          </div>
        </header>

        {/* Outlet for nested routes */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
