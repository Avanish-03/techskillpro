import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AttemptQuiz = () => {
  const { quizID, attemptID } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userID, setUserID] = useState(null);
  const [duration, setDuration] = useState(0); // duration in seconds
  const [timeLeft, setTimeLeft] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.userID) {
      alert("User not logged in");
      navigate("/login");
      return;
    }
    setUserID(parseInt(user.userID));

    // Fetch quiz duration and questions
    const fetchQuizData = async () => {
      try {
        const quizRes = await axios.get(`http://localhost:5269/api/Quiz/${quizID}`);
        const quizDurationInMinutes = quizRes.data.duration;
        const durationInSeconds = quizDurationInMinutes * 60;

        setDuration(durationInSeconds);

        const questionsRes = await axios.get(
          `http://localhost:5269/api/QuizAttempt/${attemptID}/questions`
        );
        setQuestions(questionsRes.data);

        // ✅ Set start time only after data fetch
        const now = Date.now();
        setStartTime(now);
        setTimeLeft(durationInSeconds); // ⏱ countdown starts here
      } catch (err) {
        console.error("Error fetching quiz or questions", err);
        alert("Failed to load quiz data");
      }
    };


    fetchQuizData();
  }, [quizID, attemptID, navigate]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      alert("⏰ Time's up! Auto-submitting your quiz.");
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionChange = (questionID, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionID]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // this works great

    const payload = {
      quizID: parseInt(quizID),
      userID: parseInt(userID),
      timeTaken,
      startTime: new Date(startTime).toISOString(),
      ipAddress: "127.0.0.1",
      answers: Object.entries(answers).map(([questionID, selectedOption]) => ({
        questionID: parseInt(questionID),
        selectedAnswer: selectedOption,
      })),
    };

    axios
      .post("http://localhost:5269/api/QuizAttempt/submit", payload)
      .then(() => {
        alert("✅ Quiz submitted successfully!");
        navigate("/student/dashboard/attempt");
      })
      .catch((err) => {
        console.error("Submission failed", err);
        alert("Failed to submit quiz.");
      });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const TimerDisplay = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return (
      <div className="text-right text-sm font-medium text-gray-100 mb-4">
        ⏱️ Time Left: {mins}:{secs < 10 ? `0${secs}` : secs}
      </div>
    );
  };


  const q = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-8 px-4 flex flex-col">
      {/* Header with Timer */}
      <div className="w-full max-w-4xl mx-auto mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold">🧠 Quiz In Progress</h2>
        {timeLeft !== null && <TimerDisplay />}
      </div>

      {/* Quiz Content */}
      <div className="flex-grow w-full max-w-4xl mx-auto">
        {q && (
          <div
            key={q.questionID}
            className="p-6 bg-white rounded-3xl shadow-md border border-blue-100 mb-10"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-5">
              Q{currentQuestion + 1}. {q.questionText}
            </h3>

            <div className="space-y-4">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`block p-4 rounded-xl border cursor-pointer transition duration-200 ${answers[q.questionID] === opt
                    ? "bg-blue-100 border-blue-500 text-blue-900 shadow"
                    : "bg-gray-50 border-gray-300 hover:border-blue-300"
                    }`}
                >
                  <input
                    type="radio"
                    name={`question-${q.questionID}`}
                    value={opt}
                    checked={answers[q.questionID] === opt}
                    onChange={() => handleOptionChange(q.questionID, opt)}
                    className="mr-3 accent-blue-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-auto mb-10">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex-1 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition disabled:opacity-50"
          >
            ⬅️ Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
            >
              ✅ Submit Quiz
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              ➡️ Next
            </button>
          )}
        </div>
      </div>

      {/* Footer Tip */}
      <div className="text-center text-sm text-gray-500 mt-auto pt-6">
        🚀 Stay focused! Choose wisely and give your best. Every second counts.
      </div>
    </div>
  );
};

export default AttemptQuiz;
