import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalQuizzes: 0,
    totalStudents: 0,
    totalAttempts: 0,
    averageScore: 0,
  });

  // Dummy data for chart
  const quizStats = {
    labels: ["HTML", "CSS", "JS", "React", "C#", "SQL"],
    datasets: [
      {
        label: "Quiz Attempts",
        data: [15, 12, 30, 20, 10, 25],
        backgroundColor: "skyblue",
        borderRadius: 8,
      },
    ],
  };

  useEffect(() => {
    // TODO: Replace with real API call
    // axios.get("/api/admin/quiz-analytics").then((res) => setAnalytics(res.data));
    
    // Sample static data for UI testing
    setAnalytics({
      totalQuizzes: 28,
      totalStudents: 102,
      totalAttempts: 276,
      averageScore: 72,
    });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        📊 Quiz Analytics
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 text-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Total Quizzes</h3>
          <p className="text-3xl mt-2">{analytics.totalQuizzes}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-3xl mt-2">{analytics.totalStudents}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Total Attempts</h3>
          <p className="text-3xl mt-2">{analytics.totalAttempts}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-5 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Average Score</h3>
          <p className="text-3xl mt-2">{analytics.averageScore}%</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          📈 Attempts per Quiz
        </h3>
        <Bar data={quizStats} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
