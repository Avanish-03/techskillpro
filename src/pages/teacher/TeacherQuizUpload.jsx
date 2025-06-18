import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const TeacherQuizUpload = () => {
  const [quizData, setQuizData] = useState({
    Title: '',
    Description: '',
    Duration: '',
    TotalMarks: '',
    AttemptsAllowed: '',
    PassingScore: '',
    Instructions: '',
    CategoryID: 0,
    CreatedBy: 0,
    IsPublished: false,
  });

  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({});
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
    sequence: 1,
  });

  // ✅ Load categories and user on mount
  useEffect(() => {
    axios.get('http://localhost:5269/api/Category')
      .then(res => setCategories(res.data || []))
      .catch(err => console.error('Failed to load categories', err));

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setQuizData(prev => ({ ...prev, CreatedBy: storedUser.userID }));
      setUserEmail(storedUser.email);
      fetchQuizzes(storedUser.email);
    }
  }, []);

  // ✅ Fetch quizzes created by this user
  const fetchQuizzes = async (email) => {
    try {
      const res = await axios.get("http://localhost:5269/api/Quiz");
      const filtered = res.data?.filter(q => q.createdByEmail === email);
      setQuizzes(filtered);
      fetchQuestionCounts(filtered);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  // ✅ Fetch question counts per quiz
  const fetchQuestionCounts = async (quizList) => {
    try {
      const res = await axios.get('http://localhost:5269/api/Question');
      const questionsArray = res.data.$values || [];
      const counts = {};
      quizList.forEach((quiz) => {
        counts[quiz.quizID] = questionsArray.filter(q => q.quizID === quiz.quizID).length;
      });
      setQuestionCounts(counts);
    } catch (error) {
      console.error('Error fetching questions for count:', error);
    }
  };

  // ✅ Handle field inputs in quiz form
  const handleQuizChange = e => {
    const { name, value, type, checked } = e.target;
    setQuizData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
        : ['CategoryID', 'Duration', 'TotalMarks', 'AttemptsAllowed', 'PassingScore'].includes(name)
          ? parseInt(value) || 0
          : value
    }));
  };

  // ✅ Submit quiz—converted to FormData
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!quizData.Title.trim() || !quizData.CategoryID || !quizData.CreatedBy) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }

    const form = new FormData();
    Object.entries(quizData).forEach(([key, val]) => form.append(key, val));

    try {
      const res = await axios.post("http://localhost:5269/api/Quiz", form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const newID = res.data.quizID;
      setSelectedQuiz({ QuizID: newID, Title: quizData.Title });
      setQuestionData(prev => ({ ...prev, quizID: newID }));
      setShowQuestionModal(true);
      fetchQuizzes(userEmail);
    } catch (err) {
      console.error("Quiz creation failed:", err.response?.data || err.message);
      alert("Quiz creation failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Question handlers unchanged
  const handleQuestionChange = e => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };
  const submitQuestion = async () => {
  if (!selectedQuiz || !selectedQuiz.quizID) {
    alert("No quiz selected!");
    return;
  }

  try {
    await axios.post('http://localhost:5269/api/Question', {
      ...questionData,
      quizID: selectedQuiz.quizID,
    });
    fetchQuestionsForQuiz(selectedQuiz.quizID);
    fetchQuizzes(userEmail);
    resetQuestionData();
  } catch (error) {
    console.error('Failed to add question:', error);
    alert('Failed to add question');
  }
};

  const fetchQuestionsForQuiz = async (quizID) => {
    try {
      const res = await axios.get('http://localhost:5269/api/Question');
      const questionsArray = res.data.$values || res.data || [];
      setQuestions(questionsArray.filter(q => q.quizID === quizID));
    } catch {
      setQuestions([]);
    }
  };

  const resetQuestionData = () => {
    setQuestionData({
      quizID: selectedQuiz?.QuizID || '',
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
      sequence: questions.length + 1,
    });
  };

  // const handleManageQuestions = (quiz) => {
  //   setSelectedQuiz(quiz);
  //   setQuestionData(prev => ({ ...prev, quizID: quiz.quizID }));
  //   fetchQuestionsForQuiz(quiz.quizID);
  //   setShowQuestionModal(true);
  // };
  const handleManageQuestions = (quiz) => {
  setSelectedQuiz(quiz);
  setQuestionData(prev => ({
    ...prev,
    quizID: quiz.quizID, // ✅ Ensure this line exists
    sequence: 1           // Optional: reset sequence
  }));
  fetchQuestionsForQuiz(quiz.quizID);
  setShowQuestionModal(true);
};


  const publishQuiz = (quizId, publish) => {
    axios
      .patch(`http://localhost:5269/api/Quiz/publish/${quizId}?publish=${publish}`)
      .then(() => {
        // toast.success(publish ? "Quiz Published!" : "Unpublished!");
        fetchQuizzes(userEmail); 
      })
      .catch((error) => {
        console.error("Error publishing quiz:", error.response?.data || error.message);
        toast.error("Failed to update publish status");
      });
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
  if (recognition) { recognition.continuous = false; recognition.lang = 'en-US'; }
  const handleVoiceInput = (field) => {
    if (!recognition) return alert("Speech recognition not supported");
    recognition.start();
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      recognition.stop();
      setQuestionData(prev => ({ ...prev, [field]: transcript }));
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleQuizSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-5">
        <h2 className="text-2xl font-semibold text-blue-700 border-b pb-2">Create New Quiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="Title" value={quizData.Title} onChange={handleQuizChange} placeholder="Quiz Title" className="p-3 border rounded" required />
          <select name="CategoryID" value={quizData.CategoryID} onChange={handleQuizChange} className="p-3 border rounded" required>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.categoryID} value={c.categoryID}>{c.name}</option>)}
          </select>
          <input type="number" name="Duration" value={quizData.Duration} onChange={handleQuizChange} placeholder="Duration (mins)" className="p-3 border rounded" required />
          <input type="number" name="TotalMarks" value={quizData.TotalMarks} onChange={handleQuizChange} placeholder="Total Marks" className="p-3 border rounded" required />
          <input type="number" name="AttemptsAllowed" value={quizData.AttemptsAllowed} onChange={handleQuizChange} placeholder="Attempts Allowed" className="p-3 border rounded" required />
          <input type="number" name="PassingScore" value={quizData.PassingScore} onChange={handleQuizChange} placeholder="Passing Score" className="p-3 border rounded" required />
        </div>
        <textarea name="Description" value={quizData.Description} onChange={handleQuizChange} placeholder="Description" rows="2" className="w-full p-3 border rounded" required />
        <textarea name="Instructions" value={quizData.Instructions} onChange={handleQuizChange} placeholder="Instructions" rows="2" className="w-full p-3 border rounded" required />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="IsPublished"
            checked={quizData.IsPublished}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setQuizData({ ...quizData, IsPublished: isChecked });
              publishQuiz(quizData.quizID, isChecked); //
            }}
          />
          <span>{quizData.IsPublished ? "Published" : "Publish Now"}</span>
        </label>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          {loading ? "Creating..." : "Create & Add Questions"}
        </button>
      </form>

      {/* Quiz list and question modal — EXACTLY same as your original code */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quizzes.map((quiz) => (
          <div key={quiz.quizID} className="bg-white p-4 border rounded shadow-sm">
            <div className="flex justify-between items-center">
              <button onClick={() => publishQuiz(quiz.quizID, !quiz.isPublished)} className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700">
                {quiz.isPublished ? 'Published' : 'Publish'}
              </button>
              <button onClick={() => deleteQuiz(quiz.quizID)} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Delete</button>
            </div>
            <p className="text-sm text-blue-600 font-medium">{quiz.categoryName}</p>
            <h3 className="font-bold text-lg mt-1">{quiz.title}</h3>
            <p className="text-sm">Attempts: {quiz.attemptsAllowed}</p>
            <p className="text-sm">Duration: {quiz.duration} mins</p>
            <p className="text-sm">Total Marks: {quiz.totalMarks}</p>
            <p className={`text-xs font-semibold ${quiz.isPublished ? 'text-green-600' : 'text-yellow-600'}`}>
              {quiz.isPublished ? 'Published' : 'Not Published'}
            </p>
            <button onClick={() => handleManageQuestions(quiz)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Manage Questions
            </button>
          </div>
        ))}
      </div>

      {/* Question Modal — unchanged */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-center pt-10 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setShowQuestionModal(false)} className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg">✖</button>
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Add Questions for: <span className="text-black">{selectedQuiz?.title}</span>
            </h2>
            <div className="flex items-center my-2">
              <input name="questionText" placeholder="Question" value={questionData.questionText} onChange={handleQuestionChange} className="p-2 border rounded w-full" />
              <button onClick={() => handleVoiceInput('questionText')} className="bg-gray-300 p-2 ml-2 rounded text-sm">🎤</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {['option1', 'option2', 'option3', 'option4'].map((option, idx) => (
                <div key={option} className="flex items-center space-x-2">
                  <input name={option} placeholder={`Option ${idx + 1}`} value={questionData[option]} onChange={handleQuestionChange} className="p-2 border rounded w-full" />
                  <button onClick={() => handleVoiceInput(option)} className="bg-gray-300 p-2 rounded text-sm">🎤</button>
                </div>
              ))}
              <select name="correctAnswer" value={questionData.correctAnswer} onChange={handleQuestionChange} className="p-2 border rounded w-full">
                <option value="">Select Correct Answer</option>
                <option value={questionData.option1}>Option 1</option>
                <option value={questionData.option2}>Option 2</option>
                <option value={questionData.option3}>Option 3</option>
                <option value={questionData.option4}>Option 4</option>
              </select>
              <input name="explanation" placeholder="Explanation" value={questionData.explanation} onChange={handleQuestionChange} className="p-2 border rounded w-full" />
            </div>
            <button onClick={submitQuestion} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Save Question</button>
            <div className="mt-6">
              <h3 className="text-md font-semibold text-blue-700 mb-2">📝 Total Questions: {questions.length}</h3>
              <div className="mt-4">
                {questions.map((q, index) => (
                  <div key={q.questionID} className="bg-gray-50 p-3 rounded border mb-2">
                    <h4 className="font-semibold text-gray-800">
                      Q{index + 1}: {q.questionText}
                    </h4>
                    <ul className="text-sm ml-4 text-gray-700 list-disc">
                      {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                    <p className="text-green-600 font-medium mt-1">✔ Correct: {q.correctAnswer}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEditQuestion(q)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletQuestion(q.questionID)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherQuizUpload;
