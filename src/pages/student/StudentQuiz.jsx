import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const StudentQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [attemptCounts, setAttemptCounts] = useState({});
  const [ipAddress, setIpAddress] = useState("0.0.0.0");
  const [loadingQuizID, setLoadingQuizID] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.userID;

  useEffect(() => {
    if (!userID) {
      alert("⚠️ Please log in to access quizzes.");
      navigate("/login");
    }
  }, [userID, navigate]);

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch(() => setIpAddress("0.0.0.0"));
  }, []);

  // 1. Get all published quizzes
  useEffect(() => {
    axios
      .get("http://localhost:5269/api/Quiz")
      .then((res) => {
        const published = (res.data || []).filter(
          (q) =>
            (q.isPublished === true || q.isPublished === 1 || q.isPublished === "true") &&
            q.quizID !== 19 // 👈 This line excludes quiz with ID 19
        );

        setQuizzes(published);

        // 2. For each quiz, fetch attempt count
        published.forEach((quiz) => {
          axios
            .get(`http://localhost:5269/api/QuizAttempt/AttemptCount/${userID}/${quiz.quizID}`)
            .then((res) => {
              setAttemptCounts((prev) => ({
                ...prev,
                [quiz.quizID]: res.data,
              }));
            })
            .catch((err) => console.error(`❌ Failed for quiz ${quiz.quizID}`, err));
        });
      })
      .catch((err) => console.error("❌ Failed to load quizzes", err));
  }, [userID]);


  const startQuizAttempt = (quizID) => {
    setLoadingQuizID(quizID);
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
        console.error("❌ Error starting quiz attempt", err);
        alert("There was an error starting the quiz. Please try again later.");
      })
      .finally(() => setLoadingQuizID(null));
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen py-10 px-4">
      <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white text-center rounded-lg shadow-lg mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          🚀 Ready to Test Your Skills?
        </h1>
        <p className="text-lg text-gray-100">
          Choose a quiz below and start your journey!
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          📝 Available Quizzes
        </h2>

        {quizzes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No quizzes available right now.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => {
              const attempted = attemptCounts[quiz.quizID] || 0;
              const canAttempt = attempted < quiz.attemptsAllowed;
              const isLoading = loadingQuizID === quiz.quizID;

              return (
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
                    <li>🧮 Attempts Used: {attempted}</li>
                    <li>⏱️ Duration: {quiz.duration} mins</li>
                    <li>📊 Total Marks: {quiz.totalMarks}</li>
                  </ul>
                  <button
                    onClick={() => startQuizAttempt(quiz.quizID)}
                    disabled={!canAttempt || isLoading}
                    className={`mt-6 ${!canAttempt
                      ? "bg-gray-400 cursor-not-allowed"
                      : isLoading
                        ? "bg-sky-300 cursor-wait"
                        : "bg-sky-500 hover:bg-sky-700"
                      } text-white py-2 rounded-lg font-semibold transition w-full`}
                  >
                    {!canAttempt
                      ? "🔒 Attempt Limit Reached"
                      : isLoading
                        ? "Starting..."
                        : "Start Quiz ➤"}
                  </button>
                </div>
              );
            })}
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
