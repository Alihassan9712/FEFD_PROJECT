// src/components/Courses.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="dashboard-shell">
      <main className="dashboard-main">
        <h2>Available Courses</h2>
        <div className="grid">
          {courses.map((c) => (
            <div key={c._id} className="course">
              <h3>{c.title}</h3>
              <p className="small">Code: {c.code}</p>
              <p className="small">{c.description}</p>
              <p className="small">
                Teacher: {c.teacherName || "Not specified"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Courses;
