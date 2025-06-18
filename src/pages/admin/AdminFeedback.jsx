import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaClock, FaCommentDots } from "react-icons/fa";

const AdminFeedback = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5269/api/Contact/messages")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch messages:", err);
        setError("❌ Could not fetch messages from the server.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-blue-700 dark:text-white mb-8">
        📬 Admin Contact Feedbacks
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300 animate-pulse">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No feedback messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                <FaUser className="text-blue-500 dark:text-blue-300" />
                {msg.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                <FaEnvelope className="text-gray-500" />
                {msg.email}
              </p>

              <p className="text-gray-800 dark:text-gray-200 italic mb-4 flex gap-2">
                <FaCommentDots className="mt-1 text-green-500" />
                “{msg.message}”
              </p>

              <div className="text-xs text-right text-gray-500 dark:text-gray-400 flex justify-end items-center gap-1">
                <FaClock />
                {msg.sentAt ? new Date(msg.sentAt).toLocaleString() : "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
