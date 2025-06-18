import React, { useEffect, useState } from "react";
import axios from "axios";

const Attempted = () => {
    const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResult, setSelectedResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userID;

    const fetchResults = (quizId) => {
        axios.get(`http://localhost:5269/api/Result/user/${userId}/quiz/${quizId}`)
            .then((res) => {
                setSelectedResult(res.data);
                setShowModal(true);
            })
            .catch((err) => {
                console.error("Failed to load result", err);
                alert("Result not found for this quiz.");
            });
    };

    useEffect(() => {
        if (!userId) {
            alert("User not logged in.");
            return;
        }

        axios
            .get(`http://localhost:5269/api/QuizAttempt/UserQuizzes/${userId}`)
            .then((res) => {
                const data = res.data || [];
                const latestAttemptsMap = new Map();

                data.forEach((attempt) => {
                    const quizId = attempt.quizID;
                    if (!latestAttemptsMap.has(quizId)) {
                        latestAttemptsMap.set(quizId, attempt);
                    } else {
                        const existing = latestAttemptsMap.get(quizId);
                        const existingDate = new Date(existing.attemptedAt);
                        const newDate = new Date(attempt.attemptedAt);
                        if (newDate > existingDate) {
                            latestAttemptsMap.set(quizId, attempt);
                        }
                    }
                });

                const latestAttempts = Array.from(latestAttemptsMap.values())
                    .filter(attempt => attempt.quizID !== 19)
                    .sort((a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt));

                setAttemptedQuizzes(latestAttempts);
                setFilteredQuizzes(latestAttempts); // Initial filtered list
            })
            .catch((err) => console.error("Error fetching attempted quizzes", err));
    }, []);

    // 🔍 Search Effect
    useEffect(() => {
        const filtered = attemptedQuizzes.filter(q =>
            q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (q.categoryName || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuizzes(filtered);
    }, [searchTerm, attemptedQuizzes]);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <div className="w-full bg-gradient-to-r from-green-500 to-indigo-600 p-5 text-white text-center rounded-lg shadow-lg mb-10">
                        <h1 className="text-4xl font-bold mb-2">📘 Attempted Quizzes</h1>
                        <p className="text-gray-200 text-lg">Here's a list of quizzes you’ve already taken.</p>
                    </div>

                    {/* 🔍 Search Input */}
                    <div className="mt-6">
                        <input
                            type="text"
                            placeholder="🔍 Search by quiz title or category..."
                            className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredQuizzes.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg mt-10">
                        No quizzes found matching your search.
                    </p>
                ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredQuizzes.map((quiz, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                                        ✅ Attempted
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-blue-700 mb-1">
                                    {quiz.title}
                                </h2>
                                <p className="text-sm text-gray-500 mb-3 italic">
                                    {quiz.categoryName || "General"}
                                </p>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>⏱ Duration: {quiz.duration} minutes</li>
                                    <li>📊 Total Marks: {quiz.totalMarks}</li>
                                    <li>📚 Attempts Allowed: {quiz.attemptsAllowed}</li>
                                </ul>
                                <div className="mt-4 text-right">
                                    <button
                                        onClick={() => fetchResults(quiz.quizID)}
                                        className="text-sm text-indigo-600 hover:underline font-medium"
                                    >
                                        View Result
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Result Modal */}
            {showModal && selectedResult && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl p-8 max-w-xl w-full relative border border-blue-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-extrabold text-blue-700">📋 Your Quiz Result</h2>
                            <p className="text-sm text-gray-500 mt-1">Detailed summary of your latest quiz attempt</p>
                        </div>

                        <div className="space-y-3 text-gray-700 text-base px-1">
                            <div className="flex justify-between">
                                <span className="font-medium">🎯 Quiz Title:</span>
                                <span>{selectedResult.quiz?.title || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">📅 Attempted On:</span>
                                <span>{new Date(selectedResult.quizAttempt?.attemptedAt).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">⌛ Time Taken:</span>
                                <span>{selectedResult.timeTaken} seconds</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">📊 Total Marks:</span>
                                <span>{selectedResult.totalMarks}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">🧠 Obtained Marks:</span>
                                <span className="text-green-600 font-semibold">
                                    {selectedResult.obtainedMarks}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">🎯 Percentage:</span>
                                <span className="text-blue-700 font-semibold">
                                    {selectedResult.percentage}%
                                </span>
                            </div>
                            {selectedResult.rank && (
                                <div className="flex justify-between">
                                    <span className="font-medium">🏆 Rank:</span>
                                    <span className="text-yellow-600 font-semibold">{selectedResult.rank}</span>
                                </div>
                            )}
                        </div>

                        <div className="text-center mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-semibold shadow-sm transition duration-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attempted;
