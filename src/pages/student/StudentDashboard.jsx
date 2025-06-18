import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { GrWorkshop } from 'react-icons/gr';
import img from '../../assets/images/TSP.jpg'
import axios from 'axios';
import {
  Home,
  FileEdit,
  Phone,
  MessageCircle,
  User,
  Settings,
  LogOut
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user?.userID;

    if (!token || !userId) {
      navigate('/login', { replace: true });
    } else {
      axios
        .get(`http://localhost:5269/api/User/getprofile?userID=${userId}`)
        .then((res) => {
          setUserData(res.data);
          sessionStorage.setItem('userName', res.data.name);
          sessionStorage.setItem('profileImage', `http://localhost:5269${res.data.profileImage}`);
        })
        .catch((err) => {
          console.error('Error Fetching Profile:', err);
          navigate('/login', { replace: true });
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-64 h-screen fixed top-0 left-0 bg-blue-900 text-white flex flex-col justify-between shadow-lg">
        <div className="p-6">
          <div className="text-2xl font-bold mb-10 text-center">🎓 Student Panel</div>
          <nav className="flex flex-col space-y-3">
            <NavLink to="/student/dashboard/home" className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"}>
              <Home size={18} /> Home
            </NavLink>
            <NavLink to="/student/dashboard/quiz" className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"}>
              <FileEdit size={18} /> Quiz
            </NavLink>
            <NavLink to="/student/dashboard/attempt" className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"}>
              <FileEdit size={18} /> Quiz Attempt
            </NavLink>
            <NavLink to="/student/dashboard/leaderboard" className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"}>
              <GrWorkshop size={18} /> Leaderboard
            </NavLink>
            <NavLink to="/student/dashboard/contact" className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"}>
              <Phone size={18} /> Contact
            </NavLink>
            <NavLink to="/student/dashboard/feedback" className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"}>
              <MessageCircle size={18} /> Feedback
            </NavLink>
            <NavLink to="/student/dashboard/profile" className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"}>
              <User size={18} /> Profile
            </NavLink>
            <NavLink to="/student/dashboard/setting" className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg"
                : "flex items-center gap-3 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"}>
              <Settings size={18} /> Settings
            </NavLink>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            <LogOut size={18} /> Logout
          </button>
          <p className="mt-4 text-center text-xs text-blue-100">
            &copy; 2025 TechSkillPro
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">
            Welcome, {userData ? userData.name : 'Loading...'}
          </h2>
          <Link to="/student/dashboard/profile" ><img
            src={
              userData?.profileImage
                ? `http://localhost:5269${userData.profileImage}`
                : '/default-profile.png'
            }
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          /></Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet context={{ userData }} />

        </main>
      </div>

      {/* Conditionally Render Chatbot Iframe */}
      {
        showChatbot && (
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/vgOc7FZXpowjppac2DaKT"
            style={{
              position: 'fixed',
              bottom: '70px', // above the toggle button
              right: '20px',
              width: '350px',
              height: '500px',
              border: 'none',
              zIndex: 9999,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
            }}
            title="Student Chatbot"
          />
        )
      }
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 z-[10000] text-white rounded-full shadow-md"
      >
        {showChatbot ? <img src={img} className="h-14 rounded-full" /> : <img src={img}  className="h-14 rounded-full" />}
      </button>

    </div>
  );
};

export default StudentDashboard;
