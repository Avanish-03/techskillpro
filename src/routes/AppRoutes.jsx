import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

//Student
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentHome from '../pages/student/StudentHome';
import StudentQuiz from '../pages/student/StudentQuiz';
import StudentContact from '../pages/student/StudentContact';
import StudentFeedback from '../pages/student/StudentFeedback';
import StudentProfile from '../pages/student/StudentProfile';
import StudentSettings from '../pages/student/StudentSettings';

//Teacher
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import TeacherHome from '../pages/teacher/TeacherHome';
import TeacherQuizUpload from '../pages/teacher/TeacherQuizUpload';
import TeacherResults from '../pages/teacher/TeacherResults';
import TeacherLeaderboard from '../pages/teacher/TeacherLeaderboard';
import TeacherFeedback from '../pages/teacher/TeacherFeedback';
import TeacherProfile from '../pages/teacher/TeacherProfile';
import TeacherSettings from '../pages/teacher/TeacherSettings';
import TeacherNotification from '../pages/teacher/TeacherNotification';

//admin
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminHome from '../pages/admin/AdminHome';
import AdminUsers from '../pages/admin/AdminUsers';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />

{/* Student Routes */}
    <Route path="/admin/dashboard" element={<AdminDashboard />}>
      <Route index element={<AdminHome />} />
      <Route path="home" element={<AdminHome />} />
      <Route path="users" element={<AdminUsers />} />
      {/* <Route path="contact" element={<AdminNotification />} /> */}
      {/* <Route path="contact" element={<AdminPerformance />} /> */}
      {/* <Route path="profile" element={<AdminLeaderboard />} /> */}
      {/* <Route path="feedback" element={<AdminFeedback />} /> */}
      {/* <Route path="setting" element={<AdminSettings />} /> */}
    </Route>

    {/* Student Routes */}
    <Route path="/student/dashboard" element={<StudentDashboard />}>
      <Route index element={<StudentHome />} />
      <Route path="home" element={<StudentHome />} />
      <Route path="quiz" element={<StudentQuiz />} />
      <Route path="contact" element={<StudentContact />} />
      <Route path="feedback" element={<StudentFeedback />} />
      <Route path="profile" element={<StudentProfile />} />
      <Route path="setting" element={<StudentSettings />} />
    </Route>

    {/* Teacher Routes */}
    <Route path="/teacher/dashboard" element={<TeacherDashboard />}>
      <Route index element={<TeacherHome />} />
      <Route path="home" element={<TeacherHome />} />
      <Route path="quizupload" element={<TeacherQuizUpload />} />
      <Route path="results" element={<TeacherResults />} />
      <Route path="leaderboard" element={<TeacherLeaderboard />} />
      <Route path="feedback" element={<TeacherFeedback />} />
      <Route path="profile" element={<TeacherProfile />} />
      <Route path="settings" element={<TeacherSettings />} />
      <Route path="notifications" element={<TeacherNotification />} />
    </Route>
  </Routes>
);

export default AppRoutes;
