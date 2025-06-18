import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const teacherId = user?.userID;

  useEffect(() => {
    if (!teacherId) return;

    axios
      .get(`http://localhost:5269/api/leaderboard/createdby/${teacherId}/students-results`)
      .then((res) => {
        setLeaderboard(res.data);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setError("Unable to fetch leaderboard.");
      });
  }, [teacherId]);

  const getMedal = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-blue-800 text-center mb-8 tracking-wide">
          🏆 Top Performers Leaderboard
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {leaderboard.length === 0 ? (
          <p className="text-center text-gray-500">No student results found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-blue-600 text-white text-left uppercase text-sm">
                  <th className="px-6 py-4 border border-blue-700">Rank</th>
                  <th className="px-6 py-4 border border-blue-700">Student Name</th>
                  <th className="px-6 py-4 border border-blue-700">Quiz</th>
                  <th className="px-6 py-4 border border-blue-700">Score</th>
                  <th className="px-6 py-4 border border-blue-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition duration-150">
                    <td className="px-6 py-4 border border-gray-200 font-bold text-center text-lg text-sky-600">
                      {getMedal(index + 1)}
                    </td>
                    <td className="px-6 py-4 border border-gray-200">{item.studentName}</td>
                    <td className="px-6 py-4 border border-gray-200">{item.quizTitle}</td>
                    <td className="px-6 py-4 border border-gray-200 text-center text-green-700 font-semibold">
                      {item.score}
                    </td>
                    <td className="px-6 py-4 border border-gray-200">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full"
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherLeaderboard;
