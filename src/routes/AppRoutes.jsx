import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ProtectedRoute from './ProtectedRoute';

// Student Components
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentHome from '../pages/student/StudentHome';
import StudentQuiz from '../pages/student/StudentQuiz';
import AttemptQuiz from '../pages/student/AttemptQuiz';
import Attempted from '../pages/student/Attempted';
import StudentLeaderboard from '../pages/student/StudentLeaderboard';
import StudentContact from '../pages/student/StudentContact';
import StudentFeedback from '../pages/student/StudentFeedback';
import StudentProfile from '../pages/student/StudentProfile';
import StudentSettings from '../pages/student/StudentSettings';

// Teacher Components
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import TeacherHome from '../pages/teacher/TeacherHome';
import TeacherQuizUpload from '../pages/teacher/TeacherQuizUpload';
import TeacherResults from '../pages/teacher/TeacherResults';
import TeacherLeaderboard from '../pages/teacher/TeacherLeaderboard';
import TeacherCategories from '../pages/teacher/TeacherCategories';
import TeacherFeedback from '../pages/teacher/TeacherFeedback';
import TeacherProfile from '../pages/teacher/TeacherProfile';
import TeacherSettings from '../pages/teacher/TeacherSettings';
import TeacherNotification from '../pages/teacher/TeacherNotification';
import TeacherContact from '../pages/teacher/TeacherContact';

// Admin Components
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminHome from '../pages/admin/AdminHome';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminCategories from '../pages/admin/AdminCategories';
import AdminQuiz from '../pages/admin/AdminQuiz';
import AdminAttempts from '../pages/admin/AdminAttempts';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import AdminFeedback from '../pages/admin/AdminFeedback';
import AdminNotifications from '../pages/admin/AdminNotifications';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>}>
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="quiz" element={<AdminQuiz />} />
        <Route path="attempts" element={<AdminAttempts />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="feedback" element={<AdminFeedback />} />
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>}>
        <Route index element={<StudentHome />} />
        <Route path="home" element={<StudentHome />} />
        <Route path="quiz" element={<StudentQuiz />} />
        <Route path="quiz/:quizID/attempt/:attemptID" element={<AttemptQuiz />} />
        <Route path="attempt" element={<Attempted />} />
        <Route path="leaderboard" element={<StudentLeaderboard />} />
        <Route path="contact" element={<StudentContact />} />
        <Route path="feedback" element={<StudentFeedback />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="setting" element={<StudentSettings />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>}>
        <Route index element={<TeacherHome />} />
        <Route path="home" element={<TeacherHome />} />
        <Route path="quizupload" element={<TeacherQuizUpload />} />
        <Route path="results" element={<TeacherResults />} />
        <Route path="leaderboard" element={<TeacherLeaderboard />} />
        <Route path="categories" element={<TeacherCategories />} />
        <Route path="contact" element={<TeacherContact />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="notifications" element={<TeacherNotification />} />
        <Route path="feedback" element={<TeacherFeedback />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
