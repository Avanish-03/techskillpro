import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const StudentQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [ipAddress, setIpAddress] = useState("");
  const [attemptedQuizIds, setAttemptedQuizIds] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.userID;

  // Fetch IP Address
  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch(() => setIpAddress("0.0.0.0"));
  }, []);

  // Fetch attempted quizzes
  useEffect(() => {
    if (!userID) return;
    axios
      .get(`http://localhost:5269/api/QuizAttempt/UserQuizzes/${userID}`)
      .then((res) => {
        const attempted = res.data.map((q) => q.quizID);
        setAttemptedQuizIds(attempted);
      })
      .catch((err) => console.error("Error fetching attempted quizzes", err));
  }, [userID]);

  // Fetch all quizzes
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

  // Start quiz
  const startQuizAttempt = (quizID) => {
    if (!userID) {
      alert("User not logged in.");
      return;
    }

    axios
      .post("http://localhost:5269/api/QuizAttempt/start", {
        UserID: userID,
        QuizID: quizID,
        IPAddress: ipAddress,
      })
      .then((res) => {
        const attemptID = res.data.attemptID;
        navigate(`/student/dashboard/quiz/${quizID}/attempt/${attemptID}`);
      })
      .catch((err) => {
        console.error("Error starting the quiz attempt", err);
        alert("There was an error starting the quiz.");
      });
  };

  // Filter unattempted quizzes
  const availableQuizzes = quizzes.filter(
    (quiz) => !attemptedQuizIds.includes(quiz.quizID)
  );

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen py-10 px-4">
      <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white text-center rounded-lg shadow-lg mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          🚀 Ready to Test Your Skills?
        </h1>
        <p className="text-lg text-gray-100">
          Choose a quiz below and start your learning journey!
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📝 Available Quizzes</h2>

        {availableQuizzes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            🎉 You've attempted all available quizzes!
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {availableQuizzes.map((quiz) => (
              <div
                key={quiz.quizID}
                className="bg-white border border-indigo-100 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-200"
              >
                <p className="text-sm text-blue-600 font-medium mb-2 uppercase tracking-wide">
                  {quiz.categoryName}
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>🎯 Attempts Allowed: {quiz.attemptsAllowed}</li>
                  <li>⏱️ Duration: {quiz.duration} mins</li>
                  <li>📊 Total Marks: {quiz.totalMarks}</li>
                </ul>
                <button
                  onClick={() => startQuizAttempt(quiz.quizID)}
                  className="mt-6 bg-sky-500 hover:bg-sky-700 text-white py-2 rounded-lg font-semibold transition duration-150 w-full"
                >
                  Start Quiz ➤
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mt-16 text-center text-sm text-gray-500">
        🌟 Keep challenging yourself! The more you practice, the more confident you become.
      </div>
    </div>
  );
};

export default StudentQuiz;
