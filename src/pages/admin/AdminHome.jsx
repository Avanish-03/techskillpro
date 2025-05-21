import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    feedbacks: 0,
    results: 0
  });

  useEffect(() => {
    axios.get('http://localhost:5269/api/Admin/dashboard-stats')
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching dashboard stats:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="text-gray-600 text-sm">Total Users</h4>
        <p className="text-2xl font-bold text-sky-700">{stats.totalUsers}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="text-gray-600 text-sm">Total Quizzes</h4>
        <p className="text-2xl font-bold text-sky-700">{stats.totalQuizzes}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="text-gray-600 text-sm">Feedback Received</h4>
        <p className="text-2xl font-bold text-sky-700">{stats.feedbacks}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="text-gray-600 text-sm">Total Results</h4>
        <p className="text-2xl font-bold text-sky-700">{stats.results}</p>
      </div>
    </div>
  );
};

export default AdminHome;
