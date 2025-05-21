import React from 'react';

const TeacherLeaderboard = () => {
  const leaderboard = [
    { student: 'John Doe', score: 95 },
    { student: 'Jane Smith', score: 92 },
    { student: 'Emily Johnson', score: 90 },
    // Add more mock data or fetch from API
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center py-6">Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{item.student}</td>
                <td className="px-4 py-2 border">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherLeaderboard;
