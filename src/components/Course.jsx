import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Course(){
  const { courseId } = useParams()
  const nav = useNavigate()
  const sess = JSON.parse(localStorage.getItem('assignmate_current'))
  if(!sess) return nav('/auth?role=student')

  const course = api.getCourse(courseId)
  if(!course) return <div style={{padding:30}}>Course not found</div>

  // assignments are in course.assignments
  return (
    <div className="hero">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>{course.title}</h2>
          <div>
            <button className="btn secondary" onClick={()=>nav('/student/courses')}>Back</button>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <h3 style={{color:'#cfe8f4'}}>Assignments</h3>
          {course.assignments.map(a=> (
            <div key={a.id} className="assignment">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <strong>{a.title}</strong>
                  <div className="small">{a.description}</div>
                  <div className="small">Due: {new Date(a.dueDate).toLocaleString()}</div>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:8}}>
                  <button className="btn" onClick={()=>nav(`/student/assignment/${a.id}`)}>Submit / View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
