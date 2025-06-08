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
            setQuizzes(res.data.$values || []);
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
        <div className="overflow-x-auto p-4">
            <ToastContainer />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Quizzes</h2>
                {/* <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Add Quiz
                </button> */}
            </div>

            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
                        <th className="px-4 py-2 border">Sr.no</th>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Created By</th>
                        <th className="px-4 py-2 border">Duration</th>
                        <th className="px-4 py-2 border">Total Marks</th>
                        <th className="px-4 py-2 border">Attempts</th>
                        {/* <th className="px-4 py-2 border">Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {quizzes.length > 0 ? (
                        quizzes.map((quiz, index) => (
                            <tr key={quiz.quizID} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                <td className="border px-2 py-2 text-center">{index + 1}</td>
                                <td className="border px-2 py-2">{quiz.title}</td>
                                <td className="border px-2 py-2">{quiz.categoryName}</td>
                                <td className="border px-2 py-2">{quiz.createdBy}</td>
                                <td className="border px-2 py-2 text-center">{quiz.duration}min</td>
                                <td className="border px-2 py-2 text-center">{quiz.totalMarks}</td>
                                <td className="border px-2 py-2 text-center">{quiz.attemptsAllowed}</td>
                                {/* <td className="border px-2 py-2 text-center space-x-2">
                                    <button onClick={() => handleEdit(quiz)} className="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
                                    <button onClick={() => handleDelete(quiz)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-600">No quizzes found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add Quiz Modal */}
            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Add New Quiz</h3>
                        <form onSubmit={handleAdd} className="space-y-2">
                            <input
                                type="text"
                                placeholder="Title"
                                value={newQuiz.title}
                                onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <textarea
                                placeholder="Description"
                                value={newQuiz.description}
                                onChange={(e) => setNewQuiz({ ...newQuiz, description: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Duration (mins)"
                                value={newQuiz.duration}
                                onChange={(e) => setNewQuiz({ ...newQuiz, duration: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Total Marks"
                                value={newQuiz.totalMarks}
                                onChange={(e) => setNewQuiz({ ...newQuiz, totalMarks: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Attempts Allowed"
                                value={newQuiz.attemptsAllowed}
                                onChange={(e) => setNewQuiz({ ...newQuiz, attemptsAllowed: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Passing Score"
                                value={newQuiz.passingScore}
                                onChange={(e) => setNewQuiz({ ...newQuiz, passingScore: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <textarea
                                placeholder="Instructions"
                                value={newQuiz.instructions}
                                onChange={(e) => setNewQuiz({ ...newQuiz, instructions: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                            <select
                                value={newQuiz.categoryID}
                                onChange={(e) => setNewQuiz({ ...newQuiz, categoryID: e.target.value })}
                                className="w-full border p-2 rounded"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.categoryID} value={cat.categoryID}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Edit Quiz Modal */}
            {showEditModal && selectedQuiz && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Edit Quiz</h3>
                        <input
                            type="text"
                            value={selectedQuiz.title}
                            onChange={(e) => setSelectedQuiz({ ...selectedQuiz, title: e.target.value })}
                            className="w-full border p-2 rounded mb-2"
                        />
                        <textarea
                            value={selectedQuiz.description}
                            onChange={(e) => setSelectedQuiz({ ...selectedQuiz, description: e.target.value })}
                            className="w-full border p-2 rounded mb-2"
                        />
                        <input
                            type="number"
                            value={selectedQuiz.duration}
                            onChange={(e) => setSelectedQuiz({ ...selectedQuiz, duration: e.target.value })}
                            className="w-full border p-2 rounded mb-2"
                        />
                        <select
                            value={selectedQuiz.categoryID}
                            onChange={(e) => setSelectedQuiz({ ...selectedQuiz, categoryID: e.target.value })}
                            className="w-full border p-2 rounded mb-2"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.categoryID} value={cat.categoryID}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateQuiz}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this quiz?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminQuiz;
