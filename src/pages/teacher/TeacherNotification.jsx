import React from 'react';

const TeacherNotification = () => {
  const notifications = [
    'New feedback received from students',
    'New quiz uploaded by another teacher',
    // More notifications can be added here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">Notifications</h1>

        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <li
              key={index}
              className="flex items-start bg-blue-100 text-blue-900 px-4 py-3 rounded-lg shadow-sm border-l-4 border-blue-400"
            >
              <svg
                className="w-6 h-6 mr-3 mt-1 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
              <span className="text-base">{notification}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default TeacherNotification;
