import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherSettings = () => {
  const [teacher, setTeacher] = useState(null);
  const [lastPasswordChangeDate, setLastPasswordChangeDate] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userdata = JSON.parse(localStorage.getItem("user"));
  const userID = userdata?.userID;

  useEffect(() => {
    if (!userID || isNaN(userID)) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    axios.get(`http://localhost:5269/api/User/getprofile?userID=${userID}`)
      .then(res => {
        setTeacher(res.data);
        if (res.data.lastPasswordChange) {
          setLastPasswordChangeDate(new Date(res.data.lastPasswordChange));
        }
      })
      .catch(err => {
        toast.error("Failed to fetch teacher profile.");
      });
  }, [userID]);

  const handlePasswordChange = async () => {
    // Check 15-day limit
    if (lastPasswordChangeDate) {
      const now = new Date();
      const diffTime = Math.abs(now - new Date(lastPasswordChangeDate));
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays < 15) {
        const daysLeft = Math.ceil(15 - diffDays);
        toast.warning(`You can change password again in ${daysLeft} day(s).`);
        return;
      }
    }

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

      // Set new last change date
      setLastPasswordChangeDate(new Date());
    } catch (err) {
      toast.error(err.response?.data || "Failed to change password.");
    }
  };

  const handleAccountDelete = async () => {
    if (window.confirm("Are you sure you want to delete your teacher account? This action is permanent.")) {
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

      <h2 className="text-2xl font-bold text-blue-800 mb-4">⚙️ Teacher Settings</h2>

      <div>
        <p className="text-sm text-gray-600 mb-2">
          Change your password to keep your account secure.
          <br />
          {/* <span className="text-red-500 font-semibold">
            You can only change your password once every 15 days.
          </span> */}
        </p>

        {lastPasswordChangeDate && (() => {
          const now = new Date();
          const diffTime = Math.abs(now - new Date(lastPasswordChangeDate));
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          if (diffDays < 15) {
            const daysLeft = Math.ceil(15 - diffDays);
            return (
              <p className="text-yellow-600 text-sm font-medium mb-2">
                🔒 You can change your password again in <strong>{daysLeft}</strong> day(s).
              </p>
            );
          }
          return null;
        })()}

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

        {lastPasswordChangeDate && (
          <p className="mt-2 text-sm text-gray-500">
            Last changed on: <strong>{lastPasswordChangeDate.toDateString()}</strong>
          </p>
        )}
      </div>


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

export default TeacherSettings;
