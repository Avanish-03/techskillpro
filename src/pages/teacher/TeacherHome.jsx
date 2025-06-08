import React from 'react';
import { Link } from 'react-router-dom';

const TeacherHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-700">Manage your quizzes, track results, and interact with students.</p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Manage Quizzes */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Manage Quizzes</h3>
          <p className="text-gray-600 mb-4">Create, edit, or delete quizzes to challenge your students.</p>
          <Link to="/teacher/dashboard/quizupload" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">Go to Quizzes</Link>
        </div>

        {/* Card 2: View Results */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">View Results</h3>
          <p className="text-gray-600 mb-4">Analyze your students' performance and track progress.</p>
          <Link to="/teacher/dashboard/results" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">See Results</Link>
        </div>

        {/* Card 3: Leaderboard */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Leaderboard</h3>
          <p className="text-gray-600 mb-4">View the top-performing students and motivate the class.</p>
          <Link to="/teacher/dashboard/leaderboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">View Leaderboard</Link>
        </div>

        {/* Card 4: Feedback */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Feedback</h3>
          <p className="text-gray-600 mb-4">Receive feedback from your students to improve your quizzes.</p>
          <Link to="/teacher/dashboard/feedback" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">Check Feedback</Link>
        </div>

        {/* Card 5: Settings */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Settings</h3>
          <p className="text-gray-600 mb-4">Manage your profile settings and preferences.</p>
          <Link to="/teacher/dashboard/settings" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">Go to Settings</Link>
        </div>

        {/* Card 6: Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Notifications</h3>
          <p className="text-gray-600 mb-4">Stay updated with new quiz submissions and results.</p>
          <Link to="/teacher/dashboard/notifications" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">View Notifications</Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
