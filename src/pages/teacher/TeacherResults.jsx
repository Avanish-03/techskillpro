import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const teacherId = userData?.userID;

  useEffect(() => {
    if (!teacherId) return;

    axios
      .get(`http://localhost:5269/api/Result/byteacher/${teacherId}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teacher results:", err);
        setLoading(false);
      });
  }, [teacherId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          📊 Student Quiz Results
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-center text-gray-500">No results found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="px-6 py-3 border border-blue-200">Student Name</th>
                  <th className="px-6 py-3 border border-blue-200">Quiz Title</th>
                  <th className="px-6 py-3 border border-blue-200">Score (%)</th>
                  <th className="px-6 py-3 border border-blue-200">Time Taken (min)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr
                    key={result.resultID || index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-3 border border-gray-200 font-medium">
                      {result.user?.fullName || "N/A"}
                    </td>
                    <td className="px-6 py-3 border border-gray-200">
                      {result.quiz?.title || "N/A"}
                    </td>
                    <td className="px-6 py-3 border border-gray-200 text-green-700 font-semibold">
                      {result.percentage}%
                    </td>
                    <td className="px-6 py-3 border border-gray-200 text-gray-600">
                      {(result.timeTaken / 60).toFixed(1)} min
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

export default TeacherResults;
