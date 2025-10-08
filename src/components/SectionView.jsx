import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function SectionView(){
  const { courseId, sectionId } = useParams()
  const nav = useNavigate()
  const sess = JSON.parse(localStorage.getItem('assignmate_current'))
  if(!sess) return nav('/auth?role=teacher')

  const course = api.getCourse(courseId)
  if(!course) return <div style={{padding:30}}>Course not found</div>

  const section = course.sections.find(s=>s.id===sectionId)
  if(!section) return <div style={{padding:30}}>Section not found</div>

  const [selectedAssign, setSelectedAssign] = useState(course.assignments[0]?.id || null)
  const [students, setStudents] = useState(section.students || [])

  useEffect(()=>{ /* nothing */ },[])

  function getStatus(studentId){
    const sub = api.getSubmission(selectedAssign, studentId)
    return sub ? { status:'Submitted', grade: sub.grade, review: sub.review } : { status:'Pending' }
  }

  function openGrade(studentId){
    const grade = prompt('Enter numeric grade (0-100)')
    if(grade == null) return
    const review = prompt('Optional review text')
    api.gradeSubmission(selectedAssign, studentId, grade, review)
    alert('Graded')
    // force refresh
    setStudents([...students])
  }

  return (
    <div className="hero">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>{course.title} — {section.name}</h2>
          <div>
            <button className="btn secondary" onClick={()=>nav(`/teacher/course/${course.id}`)}>Back</button>
          </div>
        </div>

        <div style={{display:'flex', gap:16, marginTop:12}}>
          <div style={{minWidth:260}}>
            <h4 className="small">Assignments</h4>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {course.assignments.map(a=>(
                <button key={a.id} className={`btn ${selectedAssign===a.id ? '' : 'secondary'}`} onClick={()=>setSelectedAssign(a.id)} style={{textAlign:'left'}}>
                  {a.title}
                </button>
              ))}
            </div>
          </div>

          <div style={{flex:1}}>
            <h4 style={{color:'#cfe8f4'}}>Students & Submissions — {selectedAssign}</h4>
            <div>
              {students.map(sid=>{
                const st = { id: sid, name: sid } // no full data here, just id
                const stStat = getStatus(sid)
                return (
                  <div key={sid} style={{display:'flex', justifyContent:'space-between', gap:12, alignItems:'center', marginBottom:10, padding:10, borderRadius:10, background:'rgba(255,255,255,0.02)'}}>
                    <div>
                      <div style={{fontWeight:700, color:'#e6eef6'}}>{st.name}</div>
                      <div className="small">{sid}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div className="small">Status: {stStat.status}</div>
                      <div className="small">Grade: {stStat.grade ?? '-'}</div>
                      <div className="small">Review: {stStat.review ?? '-'}</div>
                      <div style={{marginTop:8}}>
                        {stStat.status === 'Pending' ? <button className="btn secondary" onClick={()=>alert('Student has not submitted yet')}>No actions</button> :
                          <>
                            <button className="btn" onClick={()=>openGrade(sid)}>Grade</button>
                            <button className="btn secondary" onClick={()=>{
                              const rev = prompt('Write review / feedback') 
                              if(rev != null) { api.gradeSubmission(selectedAssign, sid, api.getSubmission(selectedAssign, sid).grade ?? '', rev); alert('Review saved'); setStudents([...students]); }
                            }}>Write review</button>
                          </>
                        }
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
