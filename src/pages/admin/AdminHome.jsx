import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaUsers,
  FaClipboardList,
  FaComments,
  FaChartBar
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    feedbacks: 0,
    results: 0
  });

  useEffect(() => {
    axios
      .get('http://localhost:5269/api/Admin/dashboard-stats')
      .then((res) => setStats(res.data))
      .catch((err) =>
        console.error('Error fetching dashboard stats:', err)
      );
  }, []);

  const chartData = [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Quizzes', value: stats.totalQuizzes },
    { name: 'Feedbacks', value: stats.feedbacks },
    { name: 'Results', value: stats.results }
  ];

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers className="text-3xl text-white" />,
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Total Quizzes',
      value: stats.totalQuizzes,
      icon: <FaClipboardList className="text-3xl text-white" />,
      color: 'from-green-500 to-green-700'
    },
    {
      title: 'Feedback Received',
      value: stats.feedbacks,
      icon: <FaComments className="text-3xl text-white" />,
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      title: 'Total Results',
      value: stats.results,
      icon: <FaChartBar className="text-3xl text-white" />,
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 transition">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Admin Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-r ${card.color} p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 text-white flex items-center space-x-4`}
          >
            {card.icon}
            <div>
              <h4 className="text-sm font-medium">{card.title}</h4>
              <p className="text-3xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow mb-10">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          📈 Summary Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis allowDecimals={false} stroke="#888" />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#0ea5e9"
              radius={[10, 10, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Welcome Info */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          🙌 Welcome to the Admin Panel
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          This panel allows you to manage all key aspects of the Quiz System:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
          <li>Users and their roles (Admin, Teacher, Student)</li>
          <li>Quiz categories and quiz uploads</li>
          <li>Student quiz attempts and results</li>
          <li>Feedback and suggestions</li>
        </ul>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
          Need help? Contact the dev team or refer to the admin documentation.
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
