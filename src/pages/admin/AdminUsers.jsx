import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [allUsers, setAllUsers] = useState([]);  // full list
  const [filteredUsers, setFilteredUsers] = useState([]); // filtered list
  const [search, setSearch] = useState("");

  const fetchAllUsers = () => {
    axios.get("http://localhost:5269/api/Admin/getallusers")
      .then(res => {
        setAllUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch(err => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);

    if (keyword.trim() === "") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter((user) =>
        user.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
        user.email.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      // Already filtering in real-time, so no need to do anything here
    }
  };

  return (
    <div className="p-6 min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Type to search name or email"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleEnterKey}
          className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder-gray-400"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-red-500 dark:text-red-400">No users found.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="w-full text-left text-sm bg-white dark:bg-gray-900">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">Sr.no</th>
                <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">Image</th>
                <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">Name</th>
                <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">Email</th>
                <th className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.userID} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  <td className="px-4 py-3 border-b dark:border-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 border-b dark:border-gray-700">
                    {user.profileImage ? (
                      <img
                        src={`http://localhost:5269${user.profileImage}`}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                      />
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b dark:border-gray-700">{user.fullName}</td>
                  <td className="px-4 py-3 border-b dark:border-gray-700">{user.email}</td>
                  <td className="px-4 py-3 border-b dark:border-gray-700">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role.toLowerCase() === "student"
                          ? "bg-blue-600"
                          : "bg-green-600"
                      } text-white`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
