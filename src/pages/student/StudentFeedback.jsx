import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [quizList, setQuizList] = useState([]);
  const [selectedQuizID, setSelectedQuizID] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userID = user?.userID;


  useEffect(() => {
    if (userID) {
      axios
        .get(`http://localhost:5269/api/QuizAttempt/UserQuizzes/${userID}`)
        .then((res) => {
          setQuizList(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch quiz list", err);
        });
    }
  }, [userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedQuizID) {
      alert("Please select a quiz.");
      return;
    }

    try {
      await axios.post("http://localhost:5269/api/Feedback", {
        userID: parseInt(userID),
        quizID: parseInt(selectedQuizID),
        rating,
        comments: feedback,
        isAnonymous,
      });

      alert("✅ Feedback submitted successfully!");
      setFeedback("");
      setRating(5);
      setSelectedQuizID("");
      setIsAnonymous(false);
    } catch (error) {
      console.error("❌ Submission failed", error);
      alert("Something went wrong while submitting feedback.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">📝 Give Feedback on a Quiz</h2>

      <form onSubmit={handleSubmit}>
        {/* Quiz Dropdown */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">Select Quiz</label>
          <select
            className="w-full border px-4 py-2 rounded-md"
            value={selectedQuizID}
            onChange={(e) => setSelectedQuizID(e.target.value)}
            required
          >
            <option value="">-- Select Quiz --</option>
            {quizList.map((quiz) => (
              <option key={quiz.quizID} value={quiz.quizID}>
                {quiz.title
                  ? `${quiz.title}`
                  : `Quiz ID: ${quiz.quizID}`}
              </option>
            ))}
          </select>
        </div>


        {/* Feedback Textarea */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Your Feedback</label>
          <textarea
            className="w-full border rounded-lg px-4 py-2"
            rows="4"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={() => setRating(star)}
                  className="hidden"
                />
                <span className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}>
                  ★
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Anonymous Toggle */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <span className="ml-2 text-gray-700">Submit as Anonymous</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentFeedback;
