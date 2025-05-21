import React, { useState } from 'react';

const TeacherQuizUpload = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleSubmit = () => {
    // Handle quiz upload logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center py-6">Upload New Quiz</h1>
      <div className="max-w-lg mx-auto">
        <label htmlFor="quizTitle" className="block text-lg mb-2">Quiz Title</label>
        <input
          type="text"
          id="quizTitle"
          className="w-full p-3 border rounded mb-6"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Enter quiz title"
        />
        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded">Upload Quiz</button>
      </div>
    </div>
  );
};

export default TeacherQuizUpload;
