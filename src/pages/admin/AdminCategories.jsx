import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: "",
    });
    const [image, setImage] = useState(null);  // To store the selected image
    const [isModalOpen, setIsModalOpen] = useState(false);

    const imageBaseURL = "http://localhost:5269";  // Update this to your actual base URL

    const apiBase = "http://localhost:5269/api/Category"; // Update with your actual API base URL

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(apiBase);
            console.log("Fetched Categories:", response.data); // Log the response
            setCategories(response.data.$values);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    // Handle image selection
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Add category
    const handleAddCategory = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", newCategory.name);
        formData.append("description", newCategory.description);
        formData.append("image", image);

        try {
            const response = await axios.post(apiBase, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Added Category Response:", response.data);
            setNewCategory({ name: "", description: "" });
            setImage(null);
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error adding category:", error);
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
            } else if (error.request) {
                console.error("No Response:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
        }
    };



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
        <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
            {/* Section for Adding Category */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Category</h2>
                <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={newCategory.name}
                            onChange={handleChange}
                            placeholder="Category Name"
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="description"
                            value={newCategory.description}
                            onChange={handleChange}
                            placeholder="Category Description"
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
                    >
                        Add Category
                    </button>
                </form>
            </div>

            {/* Section for Listing Categories */}
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Manage Categories</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                        <thead className="bg-gray-200 dark:bg-gray-700 dark:text-white">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Description</th>
                                <th className="border px-4 py-2">Image</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, index) => (
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
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
