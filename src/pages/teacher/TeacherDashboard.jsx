import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Home,
  FilePlus,
  BarChart,
  Award,
  MessageCircle,
  Settings,
  User,
  Layers,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import profileImage from '../../assets/images/defaultProfileImage.png';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const userId = sessionStorage.getItem('user');

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token || !userId) {
      navigate('/login', { replace: true });
    } else {
      axios
        .get(`http://localhost:5269/api/User/getprofile?userID=${userId}`)
        .then((res) => {
          setUserData(res.data);
          sessionStorage.setItem('userName', res.data.name);
          sessionStorage.setItem('profileImage', res.data.profileImage);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error Fetching Profile:', err);
          setLoading(false);
        });
    }
  }, [navigate, userId]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <aside className={`h-screen fixed top-0 left-0 bg-gray-800 text-white shadow-lg p-4 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
        {/* Header and Toggle */}
        <div className="flex justify-between items-center mb-6">
          {!collapsed && <div className="text-xl font-bold">👩‍🏫 Teacher Dashboard</div>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-gray-700 hover:bg-gray-600 p-1 rounded"
            title="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col justify-between h-[90%]">
          <nav className="flex flex-col space-y-4">
            <SidebarLink to="/teacher/dashboard/home" icon={<Home size={18} />} label="Home" collapsed={collapsed} />
            <SidebarLink to="/teacher/dashboard/quizupload" icon={<FilePlus size={18} />} label="Quiz Upload" collapsed={collapsed} />
            <SidebarLink to="/teacher/dashboard/categories" icon={<Layers size={18} />} label="Categories" collapsed={collapsed} />
            <SidebarLink to="/teacher/dashboard/results" icon={<BarChart size={18} />} label="View Results" collapsed={collapsed} />
            <SidebarLink to="/teacher/dashboard/leaderboard" icon={<Award size={18} />} label="Leaderboard" collapsed={collapsed} />
            <SidebarLink to="/teacher/dashboard/feedback" icon={<MessageCircle size={18} />} label="Feedbacks" collapsed={collapsed} />
            <SidebarLink to="/teacher/dashboard/profile" icon={<User size={18} />} label="Profile" collapsed={collapsed} />
            <SidebarLink to="/teacher/dashboard/settings" icon={<Settings size={18} />} label="Settings" collapsed={collapsed} />
            <SidebarLink to="/teacher/dashboard/contact" icon={<MessageCircle size={18} />} label="Contact with Admin" collapsed={collapsed} />
          </nav>

          {/* Logout */}
          <div className="mt-4">
            <button
              onClick={handleLogout}
              className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2'} w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200`}
              title="Log Out"
            >
              <LogOut size={18} />
              {!collapsed && <span className="text-sm">Log Out</span>}
            </button>
          </div>
        </div>
      </aside>


      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-72'} flex-1 flex flex-col`}>
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 border-b">
          <div className="flex items-center gap-4">
            <img
              src={userData?.profileImage || profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full border"
            />
            <h2 className="text-xl font-semibold">Welcome, {userData?.name}</h2>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet context={{ userData }} />
        </main>
      </div>
    </div>
  );
};

// Reusable Sidebar Link
const SidebarLink = ({ to, icon, label, collapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center ${collapsed ? 'justify-center' : 'gap-3'} 
      ${isActive ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-blue-500'} 
      px-4 py-2 rounded-lg transition duration-200`
    }
    title={collapsed ? label : ''}
  >
    {icon}
    {!collapsed && <span className="text-sm">{label}</span>}
  </NavLink>
);

export default TeacherDashboard;
