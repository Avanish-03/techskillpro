import React from 'react';

const TeacherNotification = () => {
  const notifications = [
    'New feedback received from students',
    'New quiz uploaded by another teacher',
    // More notifications can be added here
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center py-6">Notifications</h1>
      <ul className="list-disc pl-6">
        {notifications.map((notification, index) => (
          <li key={index} className="text-lg text-gray-800">{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherNotification;
