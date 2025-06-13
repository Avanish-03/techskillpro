import React, { useEffect, useState } from "react";
import axios from "axios";

const Attempted = () => {
    const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userID;

        if (!userId) {
            alert("User not logged in.");
            return;
        }

        axios
            .get(`http://localhost:5269/api/QuizAttempt/UserQuizzes/${userId}`)
            .then((res) => {
                const data = res.data || [];

                // ✅ Sort by attempt date descending (latest first)
                const sorted = data.sort((a, b) => new Date(b.attemptedAt) - new Date(a.attemptedAt));
                setAttemptedQuizzes(sorted);
            })
            .catch((err) => {
                console.error("Error fetching attempted quizzes", err);
            });
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen p-6">
            <div className="w-full mx-auto mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
                <h1 className="text-4xl font-bold mb-2 animate-fade-in">
                    📘 Attempted Quizzes
                </h1>
            </div>

            {attemptedQuizzes.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-10">
                    You haven't attempted any quizzes yet.
                </p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {attemptedQuizzes.map((quiz, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition"
                        >
                            <p className="text-blue-600 text-sm font-semibold uppercase mb-1">
                                Quiz ID: {quiz.quizID}
                            </p>
                            <h2 className="text-lg font-bold text-gray-800 mb-1">{quiz.title}</h2>
                            {/* <p className="text-sm text-gray-600 mb-1">
                                🕒 Attempted on:{" "}
                                {new Date(quiz.attemptedAt).toLocaleString()}
                            </p> */}
                            <p className="text-sm text-green-600 font-medium">
                                ✅ Attempted
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Attempted;
