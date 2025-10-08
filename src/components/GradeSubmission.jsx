import React, { useState } from 'react'

export default function GradeSubmission() {
  const [grade, setGrade] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = () => {
    alert(`Grade: ${grade}\nFeedback: ${feedback}`)
    setGrade('')
    setFeedback('')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Grade Submission</h2>
      <input
        type="text"
        placeholder="Enter Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      /><br/><br/>
      <textarea
        placeholder="Enter Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea><br/><br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
