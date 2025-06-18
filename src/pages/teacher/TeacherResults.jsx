import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherStudentResults = ({ userId: propUserId }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // Try to get user from localStorage if userId is not passed as a prop
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = propUserId || user?.userID;

  useEffect(() => {
    if (userId) {
      // Optional: Fetch teacher profile for extra info
      axios
        .get(`http://localhost:5269/api/User/getprofile?userID=${userId}`)
        .then((res) => {
          console.log("Profile Data:", res.data);
        })
        .catch((err) => {
          console.error("Error Fetching Profile:", err);
        });

      // Fetch results created by this teacher
      axios
        .get(`http://localhost:5269/api/result/createdby/${userId}/students-results`)
        .then((res) => {
          setResults(res.data);
        })
        .catch((err) => {
          console.error("Error fetching results:", err);
          setError("No results found or server error.");
        });
    } else {
      setError("User ID is undefined. Cannot fetch results.");
      console.warn("User ID not found in props or localStorage.");
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          👩‍🏫 Students' Results for My Quizzes
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {results.length === 0 && !error ? (
          <p className="text-center text-gray-600 text-lg">No results found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white text-sm uppercase">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Quiz</th>
                  <th className="px-4 py-3 text-center">Obtained</th>
                  <th className="px-4 py-3 text-center">Total</th>
                  <th className="px-4 py-3 text-center">Percentage (%)</th>
                  {/* <th className="px-4 py-3 text-center">Rank</th> */}
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {results.map((res, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 py-2 font-semibold">{index + 1}</td>
                    <td className="px-4 py-2">{res.studentName}</td>
                    <td className="px-4 py-2">{res.quizTitle}</td>
                    <td className="px-4 py-2 text-center">{res.obtainedMarks}</td>
                    <td className="px-4 py-2 text-center">{res.totalMarks}</td>
                    <td className="px-4 py-2 text-center">{res.percentage}%</td>
                    {/* <td className="px-4 py-2 text-center">{res.rank}</td> */}
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

export default TeacherStudentResults;
