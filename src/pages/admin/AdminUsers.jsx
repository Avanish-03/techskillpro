import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const [newUser, setNewUser] = useState({
        fullName: '',
        email: '',
        password: '',
        roleID: '',
        profileImage: null,
    });

    const fetchUsers = () => {
        axios.get("http://localhost:5269/api/Admin/getallusers")
            .then((res) => {
                const data = res.data;
                setUsers(data.$values);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching users", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        if (!newUser.fullName || !newUser.email || !newUser.password || !newUser.roleID) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const userPayload = {
            fullName: newUser.fullName,
            email: newUser.email,
            password: newUser.password,
            roleID: parseInt(newUser.roleID),
            profileImage: newUser.profileImage || ""
        };

        try {
            const res = await axios.post("http://localhost:5269/api/Admin/signup", userPayload);
            toast.success("User added successfully!");
            setShowAddModal(false);
            fetchUsers();
        } catch (err) {
            console.error(err);
            toast.error("Failed to add user");
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setSelectedImageFile(null);
        setShowEditModal(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const updateUser = async () => {
        if (!selectedUser.fullName.trim() || !selectedUser.email.trim()) {
            toast.error("Full Name and Email are required!");
            return;
        }

        const formData = new FormData();
        formData.append("UserID", selectedUser.userID);
        formData.append("FullName", selectedUser.fullName);
        formData.append("Email", selectedUser.email);
        formData.append("IsActive", true);

        // If a new profile image is selected, append it to the form data
        if (selectedImageFile) {
            formData.append("ProfileImage", selectedImageFile);
        } else {
            // If no new image is selected, append the existing profile image if necessary
            formData.append("ProfileImage", selectedUser.profileImage || "");
        }

        try {
            const res = await axios.put("http://localhost:5269/api/Admin/updateuser", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("User updated successfully");
            setShowEditModal(false);
            fetchUsers();
        } catch (err) {
            console.error("Update error", err);
            toast.error("Error updating user");
        }
    };


    const confirmDelete = () => {
        axios.delete(`http://localhost:5269/api/Admin/deleteuser/${selectedUser.userID}`)
            .then(() => {
                toast.success("User deleted");
                setShowDeleteModal(false);
                fetchUsers();
            })
            .catch(err => {
                console.error("Error deleting user", err);
                toast.error("Error deleting user");
            });
    };

    if (loading) return <div className="text-center py-10">Loading users...</div>;

    return (
        <div className="overflow-x-auto p-4">
            <ToastContainer />
            {/* Inside AdminUsers.jsx — top mein button add karo */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Users</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Add User
                </button>
            </div>

            <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Profile</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-600 dark:text-gray-300">No users found</td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={user.userID} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">
                                    <img
                                        src={user.profileImage
                                            ? `http://localhost:5269/${user.profileImage}`
                                            : "/defaultProfileImage.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="border px-4 py-2 text-gray-800 dark:text-white">{user.fullName}</td>
                                <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">{user.email}</td>
                                <td className="border px-4 py-2 text-center text-sm font-medium text-blue-600 dark:text-blue-400">{user.role || 'N/A'}</td>
                                <td className="border px-4 py-2 text-center space-x-2">
                                    <button onClick={() => handleEdit(user)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">Edit</button>
                                    <button onClick={() => handleDelete(user)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Add User Model */}
            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Add New User</h3>

                        <input type="text" placeholder="Full Name"
                            value={newUser.fullName}
                            onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                            className="w-full p-2 border mb-2 rounded" />

                        <input type="email" placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="w-full p-2 border mb-2 rounded" />

                        <input type="password" placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="w-full p-2 border mb-2 rounded" />

                        <select
                            value={newUser.roleID}
                            onChange={(e) => setNewUser({ ...newUser, roleID: e.target.value })}
                            className="w-full p-2 border mb-2 rounded"
                        >
                            <option value="">Select Role</option>
                            <option value="2">Student</option>
                            <option value="3">Teacher</option>
                        </select>

                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                            <button onClick={handleAddUser} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Edit User</h3>
                        <input
                            type="text"
                            value={selectedUser.fullName}
                            onChange={(e) => setSelectedUser({ ...selectedUser, fullName: e.target.value })}
                            placeholder="Full Name"
                            className="w-full p-2 border mb-2 rounded"
                        />
                        <input
                            type="text"
                            value={selectedUser.email}
                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                            placeholder="Email"
                            className="w-full p-2 border mb-2 rounded"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedImageFile(e.target.files[0])}
                            className="w-full mb-2"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                            <button onClick={updateUser} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p>Are you sure you want to delete <strong>{selectedUser.fullName}</strong>?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
