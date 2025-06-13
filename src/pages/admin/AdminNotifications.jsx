import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: Fetch from backend
    // axios.get("/api/notifications").then((res) => setNotifications(res.data));
    
    // Sample dummy data for UI testing
    const dummyData = [
      {
        id: 1,
        type: "quiz",
        message: "New quiz 'JavaScript Basics' uploaded",
        time: "2 mins ago",
      },
      {
        id: 2,
        type: "contact",
        message: "New contact message received from Riya",
        time: "10 mins ago",
      },
      {
        id: 3,
        type: "user",
        message: "New student user 'Ravi Kumar' registered",
        time: "30 mins ago",
      },
    ];

    setNotifications(dummyData);
  }, []);

  const getTypeStyle = (type) => {
    switch (type) {
      case "quiz":
        return "bg-blue-100 text-blue-800";
      case "contact":
        return "bg-green-100 text-green-800";
      case "user":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        🔔 Admin Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center"
          >
            <div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeStyle(note.type)}`}>
                {note.type === "quiz" && "Quiz"}
                {note.type === "contact" && "Contact"}
                {note.type === "user" && "User"}
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-200">{note.message}</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{note.time}</div>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
