import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherQuizUpload = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    duration: '',
    totalMarks: '',
    attemptsAllowed: '',
    passingScore: '',
    instructions: '',
    categoryID: '',
    createdBy: '',
    isPublished: false,
  });

  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [questionData, setQuestionData] = useState({
    quizID: '',
    questionText: '',
    questionType: 1,
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    marks: 1,
    difficulty: 1,
    explanation: '',
    sequence: 1
  });

  useEffect(() => {
    axios.get('http://localhost:5269/api/Category')
      .then(res => setCategories(res.data || []))
      .catch(err => console.error('Failed to load categories', err));

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setQuizData(prev => ({ ...prev, createdBy: storedUser.userID }));
      setUserEmail(storedUser.email);
      fetchQuizzes(storedUser.email);
    }
  }, []);

  const fetchQuizzes = async (email) => {
    try {
      const res = await axios.get("http://localhost:5269/api/Quiz");
      const filtered = res.data?.filter(q => q.createdByEmail === email);
      setQuizzes(filtered);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchQuestionsForQuiz = async (quizID) => {
    try {
      const res = await axios.get('http://localhost:5269/api/Question');
      const questionsArray = res.data.$values || [];
      const filteredQuestions = questionsArray
        .filter((question) => question.quizID === quizID)
        .map((question) => {
          if (question.$ref) {
            const refQuestion = questionsArray.find((q) => q.$id === question.$ref);
            return refQuestion || null;
          }
          return question;
        })
        .filter((question) => question !== null);

      setQuestions(filteredQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    }
  };

  const handleQuizChange = e => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleQuizSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5269/api/Quiz", quizData);
      fetchQuizzes(userEmail);
      setSelectedQuiz(res.data);
      setQuestionData(prev => ({ ...prev, quizID: res.data.quizID }));
      setShowQuestionModal(true);
    } catch (error) {
      console.error('Failed to create quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = e => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const submitQuestion = async () => {
    if (!selectedQuiz?.quizID) return alert("No quiz selected!");
    try {
      await axios.post('http://localhost:5269/api/Question', {
        ...questionData,
        quizID: selectedQuiz.quizID
      });
      fetchQuestionsForQuiz(selectedQuiz.quizID);
      resetQuestionData();
    } catch (error) {
      console.error('Failed to add question:', error);
    }
  };

  const resetQuestionData = () => {
    setQuestionData({
      quizID: selectedQuiz?.quizID || '',
      questionText: '',
      questionType: 1,
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      marks: 1,
      difficulty: 1,
      explanation: '',
      sequence: questions.length + 1
    });
  };

  const handleManageQuestions = async (quiz) => {
    setSelectedQuiz(quiz);
    setQuestionData(prev => ({ ...prev, quizID: quiz.quizID }));
    fetchQuestionsForQuiz(quiz.quizID);
    setShowQuestionModal(true);
  };

  const publishQuiz = (quizId, publish) => {
    axios.patch(`http://localhost:5269/api/Quiz/publish/${quizId}?publish=${publish}`)
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error publishing quiz:', error.response.data);
      });
  };

  const handlePublish = (quizId) => {
    const publish = true;
    publishQuiz(quizId, publish);
  };

  const deleteQuiz = async (quizID) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await axios.delete(`http://localhost:5269/api/Quiz/${quizID}`);
        fetchQuizzes(userEmail);
      } catch (error) {
        console.error('Failed to delete quiz:', error);
      }
    }
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
  }

  const handleVoiceInput = (field) => {
    if (!recognition) return alert("Speech recognition not supported in this browser.");
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      recognition.stop();
      setQuestionData(prev => ({ ...prev, [field]: transcript }));
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleQuizSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-5">
        <h2 className="text-2xl font-semibold text-blue-700 border-b pb-2">Create New Quiz</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={quizData.title} onChange={handleQuizChange} placeholder="Quiz Title" className="p-3 border rounded" required />
          <select name="categoryID" value={quizData.categoryID} onChange={handleQuizChange} className="p-3 border rounded" required>
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.categoryID} value={c.categoryID}>{c.name}</option>
            ))}
          </select>
          <input type="number" name="duration" value={quizData.duration} onChange={handleQuizChange} placeholder="Duration (mins)" className="p-3 border rounded" required />
          <input type="number" name="totalMarks" value={quizData.totalMarks} onChange={handleQuizChange} placeholder="Total Marks" className="p-3 border rounded" required />
          <input type="number" name="attemptsAllowed" value={quizData.attemptsAllowed} onChange={handleQuizChange} placeholder="Attempts Allowed" className="p-3 border rounded" required />
          <input type="number" name="passingScore" value={quizData.passingScore} onChange={handleQuizChange} placeholder="Passing Score" className="p-3 border rounded" required />
        </div>

        <textarea name="description" value={quizData.description} onChange={handleQuizChange} placeholder="Description" rows="2" className="w-full p-3 border rounded" required />
        <textarea name="instructions" value={quizData.instructions} onChange={handleQuizChange} placeholder="Instructions" rows="2" className="w-full p-3 border rounded" required />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          {loading ? "Creating..." : "Create & Add Questions"}
        </button>
      </form>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(quizzes || []).map((quiz) => (
          <div key={quiz.quizID} className="bg-white p-4 border rounded shadow-sm">
            <div className="flex justify-between items-center">
              <button
                onClick={() => handlePublish(quiz.quizID)} // Fixed here to pass quiz.quizID
                className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
              >
                {quiz.isPublished ? 'Published' : 'Publish'}
              </button>
              <button
                onClick={() => deleteQuiz(quiz.quizID)} // Fixed here to pass quiz.quizID
                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-blue-600 font-medium">{quiz.categoryName}</p>
            <h3 className="font-bold text-lg mt-1">{quiz.title}</h3>
            <p className="text-sm">Attempts: {quiz.attemptsAllowed}</p>
            <p className="text-sm">Duration: {quiz.duration} mins</p>
            <p className="text-sm">Total Marks: {quiz.totalMarks}</p>
            <p className={`text-xs font-semibold ${quiz.isPublished ? 'text-green-600' : 'text-yellow-600'}`}>
              {quiz.isPublished ? 'Published' : 'Not Published'}
            </p>
            <button
              onClick={() => handleManageQuestions(quiz)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Manage Questions
            </button>
          </div>
        ))}
      </div>

      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-10 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowQuestionModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Add Questions for: <span className="text-black">{selectedQuiz?.title}</span>
            </h2>

            <div className="flex items-center my-2">
              <input
                name="questionText"
                placeholder="Question"
                value={questionData.questionText}
                onChange={handleQuestionChange}
                className="p-2 border rounded w-full"
              />
              <button
                onClick={() => handleVoiceInput('questionText')}
                className="bg-gray-300 p-2 ml-2 rounded text-sm"
              >
                🎤
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {['option1', 'option2', 'option3', 'option4'].map((option, idx) => (
                <div className="flex items-center space-x-2" key={option}>
                  <input
                    name={option}
                    placeholder={`Option ${idx + 1}`}
                    value={questionData[option]}
                    onChange={handleQuestionChange}
                    className="p-2 border rounded w-full"
                  />
                  <button
                    onClick={() => handleVoiceInput(option)}
                    className="bg-gray-300 p-2 rounded text-sm"
                  >
                    🎤
                  </button>
                </div>
              ))}

              {/* Dropdown for correct answer */}
              <select
                name="correctAnswer"
                value={questionData.correctAnswer}
                onChange={handleQuestionChange}
                className="p-2 border rounded w-full"
              >
                <option value="">Select Correct Answer</option>
                <option value={questionData.option1}>Option 1</option>
                <option value={questionData.option2}>Option 2</option>
                <option value={questionData.option3}>Option 3</option>
                <option value={questionData.option4}>Option 4</option>
              </select>

              <input
                name="explanation"
                placeholder="Explanation"
                value={questionData.explanation}
                onChange={handleQuestionChange}
                className="p-2 border rounded w-full"
              />
            </div>

            <button
              onClick={submitQuestion}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save Question
            </button>

            <div className="mt-6">
              <h3 className="text-md font-semibold text-blue-700 mb-2">
                📝 Total Questions: {questions.length}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherQuizUpload;
