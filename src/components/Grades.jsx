import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

export default function Grades(){
  const nav = useNavigate()
  const { courseId } = useParams()
  const sess = JSON.parse(localStorage.getItem('assignmate_current'))
  if(!sess) return nav('/auth?role=student')

  const courses = api.getCourses()
  const course = courseId ? api.getCourse(courseId) : null

  // If courseId present, show assignments & grades in that course
  if(courseId && course){
    return (
      <div className="hero">
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <h2>{course.title} — Grades</h2>
            <div><button className="btn secondary" onClick={()=>nav('/student/grades')}>Back</button></div>
          </div>

          <div style={{marginTop:12}}>
            {course.assignments.map(a=>{
              const s = api.getSubmission(a.id, sess.id)
              return (
                <div key={a.id} className="assignment">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <strong>{a.title}</strong>
                      <div className="small">{a.description}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div className="small">Status: {s ? 'Submitted' : 'Not submitted'}</div>
                      <div className="small">Grade: {s?.grade ?? '-'}</div>
                      <div className="small">Review: {s?.review ?? '-'}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // otherwise show courses list
  return (
    <div className="hero">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>Your Courses & Grades</h2>
          <div><button className="btn" onClick={()=>nav('/student')}>Back</button></div>
        </div>

        <div className="grid" style={{marginTop:12}}>
          {courses.map(c=>(
            <div key={c.id} className="course">
              <h3>{c.title}</h3>
              <div className="small">{c.description}</div>
              <div style={{marginTop:8}}>
                <button className="btn" onClick={()=>nav(`/student/grades/course/${c.id}`)}>View Grades</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
