import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trophy, UserCircle } from "lucide-react";

const AdminAttempts = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5269/api/Leaderboard")
      .then((res) => setLeaderboard(res.data))
      .catch((err) => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2 dark:text-white">
          <Trophy size={28} /> Leaderboard Rankings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Top performers from all quizzes.
        </p>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 dark:bg-gray-700 uppercase text-xs text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Quiz</th>
              <th className="px-6 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No leaderboard data available.
                </td>
              </tr>
            ) : (
              leaderboard
                .sort((a, b) => b.score - a.score) // sort by score descending
                .map((entry, index) => (
                  <tr
                    key={entry.leaderboardID}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4 font-bold dark:text-white">
                      #{index + 1}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <UserCircle size={20} />
                      {entry.user?.fullName || "Unknown"}
                    </td>
                    <td className="px-6 py-4">{entry.quiz?.title || "Unknown Quiz"}</td>
                    <td className="px-6 py-4 font-semibold">{entry.score}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAttempts;
