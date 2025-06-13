import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User } from "lucide-react";

const StudentHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [ipAddress, setIpAddress] = useState("");
  const navigate = useNavigate();

  // Fetch quizzes
  useEffect(() => {
    axios
      .get("http://localhost:5269/api/Quiz")
      .then((res) => {
        const allQuizzes = res.data || [];
        const published = allQuizzes.filter((q) => q.isPublished);
        setQuizzes(published);
      })
      .catch((err) => console.error("Failed to load quizzes", err));
  }, []);

  // Fetch IP Address
  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch(() => setIpAddress("0.0.0.0"));
  }, []);

  // Start quiz attempt
  const startQuizAttempt = (quizID) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userID = user?.userID;

    if (!userID) {
      alert("User not logged in.");
      return;
    }

    axios.post("http://localhost:5269/api/QuizAttempt/start", {
      UserID: userID,
      QuizID: quizID,
      IPAddress: ipAddress
    })
      .then((res) => {
        const attemptID = res.data.attemptID;
        navigate(`/student/dashboard/quiz/${quizID}/attempt/${attemptID}`);
      })
      .catch((err) => {
        console.error("Error starting the quiz attempt", err);
        console.log("Start quiz payload:", {
          UserID: userID,
          QuizID: quizID,
          IPAddress: ipAddress
        });

        alert("There was an error starting the quiz.");
      });
  };


  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-2">
          🎯 Welcome Back To Your Dashboard!
        </h2>
        <p className="text-lg text-gray-600">
          Start exploring quizzes and track your progress
        </p>
      </div>

      {/* Available Quizzes */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📝 Available Quizzes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {quizzes.length === 0 ? (
            <p className="text-gray-500 text-center w-full">
              No quizzes available right now.
            </p>
          ) : (
            quizzes.map((quiz) => (
              <div
                key={quiz.quizID}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-blue-100 flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm text-indigo-600 font-medium mb-1">
                    {quiz.categoryName}
                  </p>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {quiz.title}
                  </h2>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>🎯 Attempts Allowed: {quiz.attemptsAllowed}</p>
                    <p>⏱️ Duration: {quiz.duration} mins</p>
                    <p>📊 Total Marks: {quiz.totalMarks}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      📅 Created: {quiz.createdAtFormatted}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => startQuizAttempt(quiz.quizID)}
                  className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
                >
                  🚀 Attempt Quiz
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-md text-center border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          🔥 Category wise Quiz Available
        </h3>
        <p className="text-gray-600 mb-5">
          Don’t miss out! Attempt your latest quiz now to boost your progress.
        </p>
        <Link
          to="/student/dashboard/quiz"
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transition"
        >
          Explore Quiz !
        </Link>
      </div>
    </div>
  );
};

export default StudentHome;
