import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AttemptQuiz = () => {
  const { quizID, attemptID } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5269/api/QuizAttempt/${attemptID}/questions`)
      .then(res => {
        setQuestions(res.data);
      })
      .catch(err => {
        console.error("Failed to load questions", err);
        alert("Unable to load questions.");
      });
  }, [attemptID]);

  const handleOptionChange = (questionID, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionID]: selectedOption
    }));
  };

  const handleSubmit = () => {
    const payload = {
      attemptID,
      answers: Object.entries(answers).map(([questionID, selectedOption]) => ({
        questionID: parseInt(questionID),
        selectedOption
      }))
    };

    axios.post(`http://localhost:5269/api/QuizAttempt/submit`, payload)
      .then(res => {
        alert("Quiz submitted successfully!");
        navigate("/student/home");
      })
      .catch(err => {
        console.error("Submission failed", err);
        alert("Failed to submit quiz.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🧠 Attempting Quiz</h2>
      
      {questions.map((q, index) => (
        <div key={q.questionID} className="mb-8 p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4">Q{index + 1}. {q.questionText}</h3>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={`question-${q.questionID}`}
                  value={opt}
                  checked={answers[q.questionID] === opt}
                  onChange={() => handleOptionChange(q.questionID, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ✅ Submit Quiz
      </button>
    </div>
  );
};

export default AttemptQuiz;
