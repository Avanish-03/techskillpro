import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const currentUserId = user?.userID;

  const leaderboardAPI = "http://localhost:5269/api/Leaderboard";

  useEffect(() => {
    axios
      .get(leaderboardAPI)
      .then((res) =>
        setLeaderboard(res.data.sort((a, b) => b.score - a.score))
      );
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-[#eef2ff] px-4 py-5 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="w-full bg-gradient-to-r from-red-500 to-indigo-600 p-6 text-white text-center rounded-2xl shadow-lg mb-10">
          <h1 className="text-4xl font-bold tracking-wider">🏆 Leaderboard</h1>
          <p className="text-sm mt-2">Check your position among top performers</p>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {topThree.map((entry, index) => {
            const isCurrentUser = entry.user?.userID === currentUserId;
            return (
              <div
                key={entry.leaderboardID}
                className={`relative bg-white/70 backdrop-blur-xl border border-indigo-100 rounded-xl p-6 shadow-xl text-center hover:scale-105 transition-transform duration-300 ${isCurrentUser ? "ring-2 ring-yellow-400" : ""
                  }`}
              >
                {/* Rank */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-700 text-white text-xl font-bold px-4 py-1 rounded-full shadow">
                  {getRankIcon(index + 1)}
                </div>

                {/* Name & Score */}
                <h2 className="mt-6 text-xl font-bold text-gray-800">
                  {entry.user?.fullName || "Unknown"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Quiz:{" "}
                  <span className="text-indigo-600 font-medium">
                    {entry.quiz?.title || "Untitled"}
                  </span>
                </p>
                <p className="text-sm mt-1">
                  Score:{" "}
                  <span className="font-bold text-green-600">{entry.score}</span>
                </p>

                {isCurrentUser && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow">
                    YOU
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Remaining Leaderboard Table */}
        {rest.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  <th className="px-5 py-3">Rank</th>
                  <th className="px-5 py-3">User</th>
                  <th className="px-5 py-3">Quiz</th>
                  <th className="px-5 py-3">Score</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((entry, index) => {
                  const isCurrentUser = entry.user?.userID === currentUserId;
                  return (
                    <tr
                      key={entry.leaderboardID}
                      className={`border-b ${isCurrentUser ? "bg-yellow-50 font-semibold" : "hover:bg-gray-50"
                        } transition`}
                    >
                      <td className="px-5 py-3">{`#${index + 4}`}</td>
                      <td className="px-5 py-3">{entry.user?.fullName}</td>
                      <td className="px-5 py-3">{entry.quiz?.title}</td>
                      <td className="px-5 py-3">{entry.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Message */}
        <div className="mt-10 text-center text-sm text-gray-500">
          🚀 Keep practicing and aim for the top spots!
        </div>
      </div>
    </div>
  );
};

export default StudentLeaderboard;
