import React from 'react';

const TeacherResults = () => {
  const results = [
    { student: 'John Doe', score: 85 },
    { student: 'Jane Smith', score: 92 },
    // Add more mock data or fetch from API
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center py-6">Quiz Results</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{result.student}</td>
                <td className="px-4 py-2 border">{result.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherResults;
