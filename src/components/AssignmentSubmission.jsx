import React, { useState } from 'react'

export default function AssignmentSubmission() {
  const [file, setFile] = useState(null)
  const handleSubmit = () => {
    alert('Assignment submitted successfully!')
    setFile(null)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Submit Assignment</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
