import React, { useState } from 'react';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = () => {
    alert(`Email change requested: ${email}`);
    // TODO: API call to change email
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    alert(`Password change requested.\nCurrent: ${currentPassword}\nNew: ${newPassword}`);
    // TODO: API call to change password
  };

  const handleAccountDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action is permanent.")) {
      alert("Account delete requested.");
      // TODO: API call to delete account
    }
  };

  return (
    <div className="mx-auto bg-blue-100 shadow-md rounded-lg p-6 space-y-10">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">⚙️ Settings</h2>

      {/* Email Change Section */}
      <div>
        <p className="text-sm text-gray-600 mb-2">
          Update your registered email address. Make sure it is valid.
        </p>
        <label className="block text-gray-700 font-medium mb-2">New Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleEmailChange}
          className="mt-3 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Change Email
        </button>
      </div>

      {/* Password Change Section */}
      <div>
        <p className="text-sm text-gray-600 mb-2">
          Change your account password. Make sure it's strong and easy to remember.
        </p>

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

      {/* Delete Account Section */}
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
