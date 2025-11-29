// src/components/TeacherCourse.jsx
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

export default function TeacherCourse(){
  const { courseId } = useParams()
  const nav = useNavigate()
  const sess = JSON.parse(localStorage.getItem('assignmate_current'))

  useEffect(() => {
    if (!sess || sess.role !== 'teacher') {
      nav('/auth?role=teacher')
    }
  }, [sess, nav])

  if (!sess || sess.role !== 'teacher') return null

  const course = api.getCourse(courseId)
  if(!course) return <div style={{padding:30}}>Course not found</div>

  return (
    <div className="hero">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>{course.title} — Sections</h2>
          <div>
            <button className="btn secondary" onClick={()=>nav('/teacher/courses')}>Back</button>
            <button className="btn" style={{marginLeft:8}} onClick={()=>nav(`/teacher/create-assignment/${course.id}`)}>+ Assignment</button>
          </div>
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
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <strong>{a.title}</strong>
                  <div className="small">{a.description}</div>
                  <div className="small">Due: {new Date(a.dueDate).toLocaleString()}</div>
                </div>
                <div>
                  <div className="small">Assignment ID: {a.id}</div>
                  <div style={{marginTop:8}}>
                    <button className="btn" onClick={() => nav(`/teacher/course/${course.id}/section/${course.sections[0]?.id || ''}`)}>View Submissions</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
