// src/components/StudentDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import AssignmentSubmit from "./AssignmentSubmit";

const STUDENT_NAME = "John Doe"; // later you can take from login

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [mySubs, setMySubs] = useState([]);

  useEffect(() => {
    // 1) load courses
    api.get("/courses").then((res) => setCourses(res.data));

    // 2) load all assignments (with course populated if backend supports it)
    api.get("/assignments").then((res) => setAssignments(res.data));

    // 3) load this student's submissions
    api
      .get("/submissions", { params: { studentName: STUDENT_NAME } })
      .then((res) => setMySubs(res.data));
  }, []);

  // ---------- STATS CALCULATION ----------
  const stats = useMemo(() => {
    const totalAssignments = assignments.length;

    const submittedCount = mySubs.length;

    const gradedCount = mySubs.filter((s) => s.marks != null).length;

    const pendingGrading = submittedCount - gradedCount; // submitted but marks not given

    // assignments which this student has NOT submitted
    const submittedIds = new Set(
      mySubs.map((s) => s.assignment && s.assignment._id)
    );
    const pendingAssignments = assignments.filter(
      (a) => !submittedIds.has(a._id)
    ).length;

    return {
      totalAssignments,
      pendingAssignments,
      submittedCount,
      gradedCount,
      pendingGrading,
    };
  }, [assignments, mySubs]);

  // helper: does this course have any assignment that the student has not submitted?
  const hasPendingForCourse = (courseId) => {
    const submittedIds = new Set(
      mySubs.map((s) => s.assignment && s.assignment._id)
    );
    return assignments.some(
      (a) =>
        a.course &&
        a.course._id === courseId &&
        !submittedIds.has(a._id)
    );
  };

  return (
    <div className="dashboard-shell">
      <main className="dashboard-main">
        {/* ===== INFO CARDS (STUDENT STATS) ===== */}
        <section className="stats-row" style={{ marginBottom: 32 }}>
          <div className="stat-card">
            <div className="stat-icon stat-icon-purple">📘</div>
            <div className="stat-text">
              <span className="stat-label">Total Assignments</span>
              <span className="stat-value">{stats.totalAssignments}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-sky">📝</div>
            <div className="stat-text">
              <span className="stat-label">Pending Assignments</span>
              <span className="stat-value">{stats.pendingAssignments}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-orange">📤</div>
            <div className="stat-text">
              <span className="stat-label">Submitted</span>
              <span className="stat-value">{stats.submittedCount}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-green">✅</div>
            <div className="stat-text">
              <span className="stat-label">Graded</span>
              <span className="stat-value">{stats.gradedCount}</span>
            </div>
          </div>
        </section>

        {/* ===== COURSES ===== */}
        <h2>My Courses</h2>
        {courses.length === 0 ? (
          <p className="small" style={{ marginBottom: 24 }}>
            No courses available yet. Your instructor will add them here.
          </p>
        ) : (
          <div className="grid" style={{ marginBottom: 32 }}>
            {courses.map((c) => {
              const showNew = hasPendingForCourse(c._id);
              return (
                <div key={c._id} className="course">
                  <div className="course-header">
                    <h3>{c.title}</h3>
                    {showNew && <span className="new-pill">New task</span>}
                  </div>
                  <p className="small">Code: {c.code}</p>
                  <p className="small">
                    {c.description || "No description provided."}
                  </p>
                  <p className="small">
                    Teacher: {c.teacherName || "Not specified"}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* ===== ASSIGNMENTS LIST ===== */}
        <h2 style={{ marginTop: 8 }}>Assignments</h2>
        {assignments.length === 0 ? (
          <p className="small">
            No assignments yet. They’ll appear here once your teacher creates
            them.
          </p>
        ) : (
          <div className="grid">
            {assignments.map((a) => (
              <div key={a._id} className="assignment">
                <strong>{a.title}</strong>
                <p className="small">
                  Course:{" "}
                  {a.course?.title
                    ? `${a.course.title} (${a.course.code})`
                    : "Not linked"}
                </p>
                <p className="small">
                  Due:{" "}
                  {a.dueDate
                    ? new Date(a.dueDate).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ===== SUBMIT ASSIGNMENT ===== */}
        <AssignmentSubmit studentName={STUDENT_NAME} />

        {/* ===== GRADES & FEEDBACK ===== */}
        <div className="card" style={{ marginTop: 32 }}>
          <h3>Your Grades & Feedback</h3>
          {mySubs.length === 0 && (
            <p className="small">No graded submissions yet.</p>
          )}
          {mySubs.map((s) => (
            <div key={s._id} style={{ marginTop: 12 }}>
              <strong>{s.assignment?.title}</strong>
              <p className="small">
                Marks: {s.marks ?? "Not graded yet"}
                <br />
                Feedback: {s.feedback || "—"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
