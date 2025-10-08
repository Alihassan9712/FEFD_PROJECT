import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import StudentDashboard from './components/StudentDashboard'
import CP from './components/cp'
import AssignmentSubmission from './components/AssignmentSubmission'
import ProgressPage from './components/ProgressPage'
import GradePage from './components/GradePage'
import TeacherDashboard from './components/TeacherDashboard'
import CourseSection from './components/CourseSection'
import StudentList from './components/StudentList'
import GradeSubmission from './components/GradeSubmission'
import NewAssignment from './components/NewAssignment'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/cp" element={<CP />} />
      <Route path="/assignment" element={<AssignmentSubmission />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/grades" element={<GradePage />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/course-section" element={<CourseSection />} />
      <Route path="/student-list" element={<StudentList />} />
      <Route path="/grade-submission" element={<GradeSubmission />} />
      <Route path="/new-assignment" element={<NewAssignment />} />
    </Routes>
  )
}
