import React from "react";

const StudentQuiz = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start p-6">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-10 text-white text-center rounded-lg shadow-lg mb-10">
        <h2 className="text-4xl font-bold mb-3">Explore Your Quizzes</h2>
        <p className="text-lg">Choose a category and challenge yourself in the world of IT!</p>
        <p className="mt-2 text-sm text-indigo-200">Practice regularly to improve your skills and track your progress.</p>
      </div>

      {/* Quiz Category Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-6">
        {/* Example Category: Programming */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-blue-600 mb-2">Programming Basics</h3>
          <p className="text-gray-600 mb-4">Test your knowledge of programming concepts including variables, loops, and functions.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Start Quiz
          </button>
        </div>

        {/* Example Category: Networking */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-green-600 mb-2">Computer Networks</h3>
          <p className="text-gray-600 mb-4">Check your understanding of network layers, protocols, IP addressing, and more.</p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
            Start Quiz
          </button>
        </div>

        {/* Example Category: Cybersecurity */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-red-600 mb-2">Cybersecurity</h3>
          <p className="text-gray-600 mb-4">Explore topics like threats, encryption, and ethical hacking with our security quizzes.</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
            Start Quiz
          </button>
        </div>

        {/* Example Category: Database */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-yellow-600 mb-2">Databases</h3>
          <p className="text-gray-600 mb-4">Assess your SQL skills, relational database knowledge, and normalization concepts.</p>
          <button className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition">
            Start Quiz
          </button>
        </div>

        {/* Example Category: Operating Systems */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-indigo-600 mb-2">Operating Systems</h3>
          <p className="text-gray-600 mb-4">Dive into OS fundamentals like processes, memory management, and file systems.</p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
            Start Quiz
          </button>
        </div>

        {/* Example Category: Web Development */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:scale-105 transition">
          <h3 className="text-2xl font-bold text-purple-600 mb-2">Web Development</h3>
          <p className="text-gray-600 mb-4">Check your skills in HTML, CSS, JavaScript, React, and modern frontend frameworks.</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
            Start Quiz
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="w-full max-w-6xl text-center mt-10">
        <p className="text-md text-gray-600">
          New quizzes are added weekly — stay tuned and keep practicing to boost your confidence!
        </p>
      </div>
    </div>
  );
};

export default StudentQuiz;
