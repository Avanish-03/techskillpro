import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const imageBaseURL = "http://localhost:5269"; 
    const apiBase = "http://localhost:5269/api/Category";

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(apiBase);
            console.log("Fetched Categories:", response.data);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    
    // Delete category
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete this category?")) {
            try {
                await axios.delete(`${apiBase}/${id}`);
                fetchCategories();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <div className="p-6 h-screen bg-white dark:bg-gray-700 rounded-xl ">
            {/* Section for Listing Categories */}
            <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-700">📚 Manage Categories</h2>
                <div className="overflow-x-auto rounded-xl shadow-md">
                    <table className="min-w-full border text-sm">
                        <thead className="bg-gray-200 dark:bg-gray-700 dark:text-white">
                            <tr>
                                <th className="border px-4 py-2">Sr.no</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Image</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(categories) && categories.length > 0 ? (
                                categories.map((cat, index) => (
                                    <tr key={cat.categoryID}>
                                        <td className="border px-4 py-2">{index + 1}</td> {/* 👈 Row number */}
                                        <td className="border px-4 py-2">{cat.name}</td>
                                        <td className="border px-4 py-2">{cat.description}</td>
                                        <td className="border px-4 py-2">
                                            {cat.imageURL && (
                                                <img
                                                    src={`${imageBaseURL}${cat.imageURL}`}
                                                    alt={cat.name}
                                                    className="h-10 w-10 object-cover rounded"
                                                />
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(cat.categoryID)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-600 py-4">No categories found.</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
