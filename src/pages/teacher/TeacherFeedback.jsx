import React, { useState } from 'react';

const TeacherFeedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle feedback submission logic
    alert('Feedback Submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center py-6">Teacher Feedback</h1>
      <textarea
        className="w-full h-32 p-3 border rounded mb-6"
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded">Submit Feedback</button>
    </div>
  );
};

export default TeacherFeedback;
