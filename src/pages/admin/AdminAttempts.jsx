import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAttempts = () => {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    axios
      .get("http://localhost:5269/api/Admin/quiz-attempts")
      .then((res) => setAttempts(res.data))
      .catch((err) =>
        console.error("Error fetching quiz attempts:", err)
      );
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 transition">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        📝 Quiz Attempts Overview
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase text-gray-600 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Quiz Title</th>
              <th className="px-6 py-3">Score</th>
              {/* <th className="px-6 py-3">Attempt Date</th> */}
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {attempts.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-6 py-4 text-gray-500"
                >
                  No quiz attempts found.
                </td>
              </tr>
            ) : (
              attempts.map((attempt, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">{attempt.studentName}</td>
                  <td className="px-6 py-4">{attempt.quizTitle}</td>
                  <td className="px-6 py-4">{attempt.score} / {attempt.totalMarks}</td>
                  {/* <td className="px-6 py-4">
                    {new Date(attempt.attemptDate).toLocaleDateString()}
                  </td> */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        attempt.score >= attempt.passingMarks
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {attempt.score >= attempt.passingMarks
                        ? "Passed"
                        : "Failed"}
                    </span>
                  </td>
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
