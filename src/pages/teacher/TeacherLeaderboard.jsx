import React from 'react';

const TeacherLeaderboard = () => {
  const leaderboard = [
    { student: 'John Doe', score: 95 },
    { student: 'Jane Smith', score: 92 },
    { student: 'Emily Johnson', score: 90 },
    // Add more mock data or fetch from API
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
  <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
    <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">Top Performers Leaderboard</h1>

    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-blue-100 text-blue-700">
            <th className="px-6 py-3 border border-blue-200">Rank</th>
            <th className="px-6 py-3 border border-blue-200">Student Name</th>
            <th className="px-6 py-3 border border-blue-200">Score (%)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-6 py-3 border border-gray-200 font-bold text-sky-600">{index + 1}</td>
              <td className="px-6 py-3 border border-gray-200 font-medium">{item.student}</td>
              <td className="px-6 py-3 border border-gray-200 font-semibold text-green-700">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default TeacherLeaderboard;
