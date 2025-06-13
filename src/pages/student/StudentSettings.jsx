import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userdata = JSON.parse(localStorage.getItem("user"));
  const userID = userdata?.userID;
  // console.log(userID);

  useEffect(() => {
    if (!userID || isNaN(userID)) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    axios.get(`http://localhost:5269/api/User/getprofile?userID=${userID}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        toast.error("Failed to fetch profile.");
      });
  }, [userID]);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning("Please fill all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("New passwords do not match.");
      return;
    }

    try {
      await axios.put("http://localhost:5269/api/User/changepassword", {
        UserID: userID,
        CurrentPassword: currentPassword,
        NewPassword: newPassword
      });
      toast.success("Password changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data || "Failed to change password.");
    }
  };

  const handleAccountDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is permanent.")) {
      try {
        await axios.delete(`http://localhost:5269/api/User/${userID}`);
        toast.success("Account deleted.");
        localStorage.clear();
        setTimeout(() => window.location.href = '/', 1500);
      } catch (err) {
        toast.error("Failed to delete account.");
      }
    }
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-md p-6 space-y-10">
      <ToastContainer position="top-center" autoClose={3000} />

      <h2 className="text-2xl font-bold text-blue-800 mb-4">⚙️ Account Settings</h2>

      {/* Password Section */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Change your account password.</p>

        <label className="block text-gray-700 font-medium mb-2">Current Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label className="block text-gray-700 font-medium mt-4 mb-2">New Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label className="block text-gray-700 font-medium mt-4 mb-2">Confirm New Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handlePasswordChange}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Change Password
        </button>
      </div>

      {/* Delete Account */}
      <div className="mt-10">
        <p className="text-sm text-red-600 mb-2">
          Permanently delete your account. This action cannot be undone.
        </p>
        <button
          onClick={handleAccountDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          ❌ Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
