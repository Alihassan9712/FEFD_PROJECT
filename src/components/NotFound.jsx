import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function NotFound(){
  const nav = useNavigate()
  return (
    <div className="hero">
      <div className="card" style={{textAlign:'center'}}>
        <h2>404 — Page not found</h2>
        <p className="small">The page you requested doesn't exist.</p>
        <div style={{marginTop:12}}>
          <button className="btn" onClick={()=>nav('/')}>Go Home</button>
        </div>
      </div>
    </div>
  )
}
