import React, { useState } from 'react';

const TeacherSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleSettingsChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center py-6">Settings</h1>
      <div className="max-w-lg mx-auto">
        <label className="block text-lg mb-2">Enable Notifications</label>
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={handleSettingsChange}
          className="mb-6"
        />
        <label className="block text-lg mb-2">Dark Mode</label>
        <input
          type="checkbox"
          name="darkMode"
          checked={settings.darkMode}
          onChange={handleSettingsChange}
          className="mb-6"
        />
      </div>
    </div>
  );
};

export default TeacherSettings;
