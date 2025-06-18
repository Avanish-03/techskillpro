import React, { useEffect, useState } from 'react';

const AdminFeedback = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5269/api/Contact/messages")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load data");
        }
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
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
  <h2 className="text-2xl font-bold mb-8 animate-fade-in">📬 Admin Feedback Messages</h2>

  {loading && (
    <div className="text-center text-gray-600 text-lg animate-pulse">Loading messages...</div>
  )}

  {error && (
    <div className="text-center text-red-500 text-lg font-medium">{error}</div>
  )}

  {!loading && !error && messages.length === 0 && (
    <div className="text-center text-gray-500 text-lg">No feedback messages found.</div>
  )}

  {!loading && !error && messages.length > 0 && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{msg.name}</h3>
            <p className="text-sm text-blue-600">{msg.email}</p>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 whitespace-pre-line">{msg.message}</p>
          </div>

          <div className="text-sm text-gray-500 text-right">
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
