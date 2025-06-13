import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [quizTitles, setQuizTitles] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("All");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const teacherId = user?.userID;

  useEffect(() => {
    if (!teacherId) {
      console.error("Teacher ID missing");
      return;
    }

    axios
      .get(`http://localhost:5269/api/Feedback/ByTeacher/${teacherId}`)
      .then((res) => {
        setFeedbackList(res.data);
        setFilteredFeedbacks(res.data);
        const titles = [...new Set(res.data.map((f) => f.quizTitle))];
        setQuizTitles(titles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err);
        setLoading(false);
      });
  }, [teacherId]);

  useEffect(() => {
    if (selectedQuiz === "All") {
      setFilteredFeedbacks(feedbackList);
    } else {
      setFilteredFeedbacks(
        feedbackList.filter((f) => f.quizTitle === selectedQuiz)
      );
    }
  }, [selectedQuiz, feedbackList]);

  const avgRating =
    filteredFeedbacks.length > 0
      ? (
          filteredFeedbacks.reduce((sum, f) => sum + f.rating, 0) /
          filteredFeedbacks.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-700">
          📋 Student Feedback for Your Quizzes
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <label className="font-medium mr-2">🎯 Filter by Quiz:</label>
              <select
                value={selectedQuiz}
                onChange={(e) => setSelectedQuiz(e.target.value)}
                className="border rounded px-3 py-1"
              >
                <option>All</option>
                {quizTitles.map((title, idx) => (
                  <option key={idx}>{title}</option>
                ))}
              </select>
            </div>

            <div className="text-xl font-semibold text-indigo-700">
              ⭐ Average Rating:{" "}
              <span className="text-yellow-500">{avgRating}</span>/5
            </div>
          </div>

          {filteredFeedbacks.length === 0 ? (
            <p className="text-gray-600 text-center">No feedback available.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {filteredFeedbacks.map((feedback) => (
                <div
                  key={feedback.feedbackID}
                  className="bg-gray-50 border p-5 rounded-xl shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-indigo-600 mb-1">
                    {feedback.quizTitle}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    From: {feedback.studentName}
                  </p>
                  <p className="text-gray-800 italic mb-3">
                    “{feedback.comments}”
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500 text-lg">
                      {"★".repeat(feedback.rating)}
                    </span>
                    <span className="text-gray-400">
                      {5 - feedback.rating > 0 &&
                        "☆".repeat(5 - feedback.rating)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(feedback.submittedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherFeedback;
