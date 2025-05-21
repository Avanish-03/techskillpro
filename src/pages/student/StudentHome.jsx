import React from "react";

const StudentHome = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      {/* Page Heading */}
      <div className="w-full max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-600 mb-2">Welcome Back, Student!</h2>
        <p className="text-lg text-gray-600">Here’s a quick overview of your quiz journey</p>
      </div>

      {/* Dashboard Stats Cards */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {[
          { label: "Enrolled Quizzes", value: 8 },
          { label: "Attempted", value: 5 },
          { label: "Correct Answers", value: 42 },
          { label: "Score", value: "380 / 500" },
          { label: "Progress", value: "76%" },
          { label: "Categories", value: 6 }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-2xl font-bold text-blue-600">{item.value}</div>
            <div className="text-sm text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Active Quizzes Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Active Quizzes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "HTML & CSS Basics",
              category: "Web Development",
              level: "Beginner",
              attempts: 2,
              score: "85%",
              progress: 100
            },
            {
              title: "JavaScript Fundamentals",
              category: "Programming",
              level: "Intermediate",
              attempts: 1,
              score: "76%",
              progress: 80
            },
            {
              title: "Networking Concepts",
              category: "IT Fundamentals",
              level: "Advanced",
              attempts: 0,
              score: "Not Attempted",
              progress: 0
            }
          ].map((quiz, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-4">
              <div className="text-blue-500 font-semibold text-sm mb-1">{quiz.category}</div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{quiz.title}</h4>
              <p className="text-sm text-gray-600 mb-2">Level: {quiz.level}</p>
              <p className="text-sm text-gray-600 mb-2">Attempts: {quiz.attempts}</p>
              <p className="text-sm text-gray-600 mb-2">Score: {quiz.score}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${quiz.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{quiz.progress}% Completed</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Quiz Section */}
      <div className="w-full max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Latest Quiz Available</h3>
        <p className="text-gray-600 mb-6">Don’t miss out! Attempt your latest quiz now.</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Start Latest Quiz
        </button>
      </div>
    </div>
  );
};

export default StudentHome;
