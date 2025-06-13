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
      <h2 className="text-2xl font-bold mb-8 animate-fade-in">
        📬 Admin Feedback Messages
      </h2>

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
        <div className="overflow-x-auto rounded-lg shadow-sm bg-white animate-fade-in">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">Name</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Email</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Message</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Sent At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map((msg, index) => (
                <tr
                  key={msg.id}
                  className={`hover:bg-blue-50 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{msg.name}</td>
                  <td className="px-6 py-4 text-blue-600">{msg.email}</td>
                  <td className="px-6 py-4 text-gray-700 whitespace-pre-line">{msg.message}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {msg.sentAt ? new Date(msg.sentAt).toLocaleString() : "N/A"}
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

export default AdminFeedback;
