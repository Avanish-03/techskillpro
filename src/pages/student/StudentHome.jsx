import { useNavigate, Link } from "react-router-dom";

const StudentHome = () => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 min-h-screen py-8 px-4">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-blue-400 to-sky-600 p-5 text-white text-center rounded-lg">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 mb-3 animate-fade-in">
          🎯 Welcome Back to Your Dashboard!
        </h2>
        <p className="text-lg text-gray-200 max-w-xl mx-auto">
          Start exploring quizzes, enhance your skills, and track your progress effortlessly.
        </p>
      </div>

      {/* Quiz Category Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto px-4 py-6">
        {[
          {
            title: "Programming Basics",
            desc: "Test your knowledge of programming concepts including variables, loops, and functions.",
            color: "blue",
          },
          {
            title: "Computer Networks",
            desc: "Check your understanding of network layers, protocols, IP addressing, and more.",
            color: "green",
          },
          {
            title: "Cybersecurity",
            desc: "Explore topics like threats, encryption, and ethical hacking with our security quizzes.",
            color: "red",
          },
          {
            title: "Databases",
            desc: "Assess your SQL skills, relational database knowledge, and normalization concepts.",
            color: "yellow",
          },
          {
            title: "Operating Systems",
            desc: "Dive into OS fundamentals like processes, memory management, and file systems.",
            color: "indigo",
          },
          {
            title: "Web Development",
            desc: "Check your skills in HTML, CSS, JavaScript, React, and modern frontend frameworks.",
            color: "purple",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className={`text-2xl font-bold text-${item.color}-600 mb-3`}>
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
            <Link to="/student/dashboard/quiz"
              className={`mt-6 bg-${item.color}-600 hover:bg-${item.color}-700 text-white px-6 py-2 rounded-full transition duration-150 font-medium`}
            >
              Start Quiz
            </Link>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg text-center border border-indigo-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          🔥 Quizzes Available by Category
        </h3>
        <p className="text-gray-600 mb-6">
          Don’t miss out! Attempt the latest quizzes to strengthen your knowledge and track your journey.
        </p>
        <Link
          to="/student/dashboard/quiz"
          className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition"
        >
          Explore Quizzes →
        </Link>
      </div>
    </div>
  );
};

export default StudentHome;
