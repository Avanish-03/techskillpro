import React, { useState } from 'react';

const StudentFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5); // Default rating set to 5

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the feedback submission logic
    alert(`Feedback Submitted!\nRating: ${rating}\nFeedback: ${feedback}`);
    // Reset form
    setFeedback('');
    setRating(5);
  };

  return (
    <div className="mx-auto max-w-4xl bg-blue-100 shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">💬 Submit Feedback</h2>
      <p className="text-lg text-gray-700 mb-4">We value your feedback to help us improve. Please share your thoughts!</p>

      {/* Feedback Form */}
      <form onSubmit={handleSubmit}>
        {/* Feedback Text Area */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Your Feedback</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2 text-gray-700"
            rows="5"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={handleFeedbackChange}
          />
        </div>

        {/* Rating Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star}>
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating == star}
                  onChange={handleRatingChange}
                  className="hidden"
                />
                <span
                  className={`text-${star <= rating ? 'yellow' : 'gray'}-500 text-xl`}
                >
                  ★
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentFeedback;
