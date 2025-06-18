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
// ...imports and ChartJS.register (same as before)

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalQuizzes: 0,
    totalStudents: 0,
    totalAttempts: 0,
    averageScore: 0,
  });

  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5269/api/admin/quiz-analytics")
      .then((res) => setAnalytics(res.data))
      .catch((err) => console.error("❌ Error fetching quiz analytics:", err));

    axios
      .get("http://localhost:5269/api/admin/quiz-attempts")
      .then((res) => {
        const filtered = res.data.filter((item) => item.quizID !== 19);
        const counts = {};
        filtered.forEach((item) => {
          counts[item.quizTitle] = (counts[item.quizTitle] || 0) + 1;
        });

        setBarChartData({
          labels: Object.keys(counts),
          datasets: [
            {
              label: "Attempts",
              data: Object.values(counts),
              backgroundColor: "#38bdf8",
              borderRadius: 6,
            },
          ],
        });
      })
      .catch((err) => console.error("❌ Error fetching quiz attempts:", err));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        📊 Admin Dashboard Overview
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Quizzes" value={analytics.totalQuizzes} icon="📚" color="from-indigo-500 to-indigo-700" />
        <StatCard title="Total Students" value={analytics.totalStudents} icon="🎓" color="from-green-500 to-green-700" />
        <StatCard title="Total Attempts" value={analytics.totalAttempts} icon="🧠" color="from-yellow-500 to-yellow-700" />
        <StatCard title="Average Score" value={`${analytics.averageScore}%`} icon="📈" color="from-purple-500 to-purple-700" />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm mb-10">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📌 Attempts Distribution</h3>
        <Bar data={barChartData} />
      </div>

      {/* Additional Content Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Today's Activity"
          icon="⚡"
          description="12 quizzes were attempted today with an average score of 76%. 3 students passed all quizzes."
        />
        <InfoCard
          title="Top Performing Student"
          icon="🏆"
          description="Aarav Singh has the highest average score this week: 94% across 5 quizzes."
        />
        <InfoCard
          title="System Status"
          icon="🛠️"
          description="All services operational. No issues reported. Last backup: 2 hours ago."
        />
        <InfoCard
          title="Upcoming Quizzes"
          icon="🗓️"
          description="4 quizzes are scheduled this week. Review and approve drafts before publishing."
        />
        <InfoCard
          title="Feedback Summary"
          icon="💬"
          description="Most feedback is positive. Students appreciate quiz variety. Suggested: Add hint system."
        />
        <InfoCard
          title="Quiz Completion Rate"
          icon="✅"
          description="89% of students who start a quiz complete it. Drop rate is below 11%."
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-gradient-to-r ${color} text-white p-6 rounded-2xl shadow-lg`}>
    <div className="text-4xl mb-2">{icon}</div>
    <h4 className="text-md font-semibold">{title}</h4>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const InfoCard = ({ title, description, icon }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-2xl">{icon}</span>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h4>
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

export default AdminAnalytics;
