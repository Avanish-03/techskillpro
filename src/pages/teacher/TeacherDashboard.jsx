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
  Bell
} from 'lucide-react';
import profileImage from '../../assets/images/defaultProfileImage.png';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
          alert("Could not load profile. Please login again.");
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
      <aside className="w-72 h-screen fixed top-0 left-0 bg-gray-800 text-white flex flex-col justify-between shadow-lg p-6">
        <div className="text-2xl font-bold mb-6 text-center">👩‍🏫 Teacher Dashboard</div>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/teacher/dashboard/home"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            <Home size={18} /> Home
          </NavLink>
          <NavLink
            to="/teacher/dashboard/quizupload"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            <FilePlus size={18} /> Quiz Upload
          </NavLink>
          <NavLink
            to="/teacher/dashboard/results"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            <BarChart size={18} /> View Results
          </NavLink>
          <NavLink
            to="/teacher/dashboard/leaderboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            <Award size={18} /> Leaderboard
          </NavLink>
          <NavLink
            to="/teacher/dashboard/feedback"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            <MessageCircle size={18} /> Feedback
          </NavLink>
          <NavLink
            to="/teacher/dashboard/settings"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            <Settings size={18} /> Settings
          </NavLink>
          <NavLink
            to="/teacher/dashboard/profile"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            <User size={18} /> Profile
          </NavLink>
          <NavLink
            to="/teacher/dashboard/notifications"
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-500 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            <Bell size={18} /> Notifications
          </NavLink>
        </nav>
        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-72 flex-1 flex flex-col">
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

export default TeacherDashboard;
