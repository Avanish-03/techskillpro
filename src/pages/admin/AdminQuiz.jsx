import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newQuiz, setNewQuiz] = useState({
        title: "",
        description: "",
        duration: 0,
        totalMarks: 0,
        attemptsAllowed: 1,
        passingScore: 0,
        instructions: "",
        categoryID: "",
        createdBy: 1
    });
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const fetchQuizzes = async () => {
        try {
            const res = await axios.get("http://localhost:5269/api/quiz");
            setQuizzes(res.data || []);
        } catch (error) {
            toast.error("Failed to fetch quizzes");
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5269/api/Category");
            setCategories(res.data.$values || []);
        } catch (error) {
            toast.error("Failed to fetch categories");
        }
    };

    useEffect(() => {
        fetchQuizzes();
        fetchCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        // Validation for required fields
        if (!newQuiz.title || !newQuiz.categoryID || !newQuiz.duration || !newQuiz.totalMarks) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            await axios.post("http://localhost:5269/api/quiz", {
                ...newQuiz,
                duration: parseInt(newQuiz.duration),
                categoryID: parseInt(newQuiz.categoryID),
            });

            toast.success("Quiz added successfully!");
            setShowAddModal(false);
            setNewQuiz({
                title: "",
                description: "",
                duration: 0,
                totalMarks: 0,
                attemptsAllowed: 1,
                passingScore: 0,
                instructions: "",
                categoryID: "",
                createdBy: 1
            });
            fetchQuizzes();
        } catch (error) {
            toast.error("Failed to add quiz");
        }
    };

    const handleEdit = (quiz) => {
        setSelectedQuiz({ ...quiz });
        setShowEditModal(true);
    };

    const handleUpdateQuiz = async () => {
        if (!selectedQuiz.title || !selectedQuiz.categoryID || !selectedQuiz.duration || !selectedQuiz.totalMarks) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            await axios.put(`http://localhost:5269/api/quiz/${selectedQuiz.quizID}`, {
                ...selectedQuiz,
                categoryID: parseInt(selectedQuiz.categoryID),
            });
            toast.success("Quiz updated successfully!");
            setShowEditModal(false);
            setSelectedQuiz(null);
            fetchQuizzes();
        } catch (error) {
            toast.error("Failed to update quiz");
        }
    };

    const handleDelete = (quiz) => {
        setSelectedQuiz(quiz);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5269/api/quiz/${selectedQuiz.quizID}`);
            toast.success("Quiz deleted successfully!");
            setShowDeleteModal(false);
            setSelectedQuiz(null);
            fetchQuizzes();
        } catch (error) {
            toast.error("Failed to delete quiz");
        }
    };

    return (
        <div className="overflow-x-auto p-6 bg-white dark:bg-gray-900 min-h-screen transition">
            <ToastContainer />
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">📚 Manage All Quizzes</h2>
                {/* <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm"
                >
                    ➕ Add New Quiz
                </button> */}
            </div>

            <div className="rounded-xl overflow-hidden shadow border border-gray-200 dark:border-gray-700">
                <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Created By</th>
                            <th className="px-6 py-3">Duration</th>
                            <th className="px-6 py-3">Marks</th>
                            <th className="px-6 py-3">Attempts</th>
                            {/* <th className="px-6 py-3 text-center">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz, index) => (
                                <tr
                                    key={quiz.quizID}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-600"
                                >
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3 font-medium">{quiz.title}</td>
                                    <td className="px-6 py-3">{quiz.categoryName}</td>
                                    <td className="px-6 py-3">{quiz.createdBy}</td>
                                    <td className="px-6 py-3">{quiz.duration} min</td>
                                    <td className="px-6 py-3">{quiz.totalMarks}</td>
                                    <td className="px-6 py-3">{quiz.attemptsAllowed}</td>
                                    {/* <td className="px-6 py-3 flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(quiz)}
                                            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(quiz)}
                                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                                        >
                                            🗑️
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">
                                    No quizzes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default AdminQuiz;
