import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function TeacherCourse(){
  const { courseId } = useParams()
  const nav = useNavigate()
  const sess = JSON.parse(localStorage.getItem('assignmate_current'))
  if(!sess) return nav('/auth?role=teacher')

  const course = api.getCourse(courseId)
  if(!course) return <div style={{padding:30}}>Course not found</div>

  return (
    <div className="hero">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>{course.title} — Sections</h2>
          <div><button className="btn secondary" onClick={()=>nav('/teacher')}>Back</button></div>
        </div>

        <div style={{marginTop:12}}>
          <h3 style={{color:'#cfe8f4'}}>Sections</h3>
          <div className="grid">
            {course.sections.map(s=>(
              <div key={s.id} className="course">
                <h3>{s.name}</h3>
                <div className="small">Students: {s.students.length}</div>
                <div style={{marginTop:10}}>
                  <button className="btn" onClick={()=>nav(`/teacher/course/${course.id}/section/${s.id}`)}>Open Section</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:20}}>
          <h3 style={{color:'#cfe8f4'}}>Assignments (Course Level)</h3>
          {course.assignments.map(a=>(
            <div key={a.id} className="assignment">
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                  <strong>{a.title}</strong>
                  <div className="small">{a.description}</div>
                </div>
                <div>
                  <div className="small">Assignment ID: {a.id}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
