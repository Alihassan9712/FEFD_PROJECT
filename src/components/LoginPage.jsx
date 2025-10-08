import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [role, setRole] = useState('student')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (role === 'student') navigate('/student-dashboard')
    else navigate('/teacher-dashboard')
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>AssignMate</h1>
      <h3>Assignment Management System</h3>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
