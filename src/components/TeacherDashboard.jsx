import React from 'react'
import { Link } from 'react-router-dom'

export default function TeacherDashboard() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Teacher Dashboard</h2>
      <nav>
        <Link to="/course-section">Courses</Link> | 
        <Link to="/student-list">Students</Link> | 
        <Link to="/grade-submission">Grades</Link> | 
        <Link to="/new-assignment">New Assignment</Link>
      </nav>
    </div>
  )
}
