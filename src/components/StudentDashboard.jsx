import React from 'react'
import { Link } from 'react-router-dom'

export default function StudentDashboard() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Student Dashboard</h2>
      <nav>
        <Link to="/cp">Course Page</Link> | 
        <Link to="/assignment">Submit Assignment</Link> | 
        <Link to="/progress">Progress</Link> | 
        <Link to="/grades">Grades</Link>
      </nav>
    </div>
  )
}
