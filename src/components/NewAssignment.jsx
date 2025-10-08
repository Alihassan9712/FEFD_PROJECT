import React, { useState } from 'react'

export default function NewAssignment() {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')

  const handlePost = () => {
    alert(`Assignment "${title}" posted (Deadline: ${deadline})`)
    setTitle('')
    setDeadline('')
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Post New Assignment</h2>
      <input
        type="text"
        placeholder="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br/><br/>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      /><br/><br/>
      <button onClick={handlePost}>Post Assignment</button>
    </div>
  )
}
