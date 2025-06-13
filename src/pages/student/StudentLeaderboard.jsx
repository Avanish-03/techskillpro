import React, { useState } from "react";
import img from '../../assets/images/Avanish.jpeg'

const StudentLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([
    {
      leaderboardID: 1,
      score: 92,
      user: {
        fullName: "Avanish Yadav",
        profileImage: img
      },
      quiz: {
        title: "React Basics"
      }
    },
    {
      leaderboardID: 2,
      score: 88,
      user: {
        fullName: "Priya Sharma",
        profileImage: img
      },
      quiz: {
        title: "C# Intermediate"
      }
    },
    {
      leaderboardID: 3,
      score: 83,
      user: {
        fullName: "Rohit Kumar",
        profileImage: img
      },
      quiz: {
        title: "HTML & CSS"
      }
    },
    {
      leaderboardID: 4,
      score: 78,
      user: {
        fullName: "Nikhil Verma",
        profileImage: img
      },
      quiz: {
        title: "SQL Queries"
      }
    }
  ]);

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 via-indigo-50 to-white min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          🏆 Quiz Leaderboard
        </h1>
        <p className="text-gray-600 text-lg">
          See where you stand and get inspired by your fellow learners!
        </p>
      </div>

      {/* Leaderboard Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.leaderboardID}
            className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={entry.user.profileImage}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-indigo-500"
                />
                <div className="absolute -top-2 -left-2 text-2xl">
                  {getRankIcon(index + 1)}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {entry.user.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  Quiz: <span className="font-medium text-indigo-600">{entry.quiz.title}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  🔥 Score: <span className="font-bold text-green-600">{entry.score}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Motivation Message */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        🚀 Keep practicing and climb up the leaderboard. New quizzes, new opportunities!
      </div>
    </div>
  );
};

export default StudentLeaderboard;
