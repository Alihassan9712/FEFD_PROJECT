// src/components/TeacherDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../index.css";
import api from "../services/api";
import CreateCourse from "./CreateCourse";
import CreateAssignment from "./CreateAssignment";

function TeacherDashboard() {
  const [mode, setMode] = useState(null); // "course" | "assignment" | null

  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cRes, aRes, sRes] = await Promise.all([
        api.get("/courses"),
        api.get("/assignments"),
        api.get("/submissions"),
      ]);
      setCourses(cRes.data);
      setAssignments(aRes.data);
      setSubs(sRes.data);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // recompute after any change
  const stats = useMemo(() => {
    const activeAssignments = assignments.length;
    const submissionsReceived = subs.length;
    const graded = subs.filter((s) => s.marks != null).length;
    const pendingGrading = submissionsReceived - graded;
    return { activeAssignments, submissionsReceived, graded, pendingGrading };
  }, [assignments, subs]);

  // latest 3 assignments for "Recent Assignments"
  const recentAssignments = useMemo(
    () => assignments.slice(-3).reverse(),
    [assignments]
  );

  return (
    <div className="dashboard-shell">
      <main className="dashboard-main">
        {/* ====== STATS CARDS ====== */}
        <section className="stats-row">
          <div className="stat-card">
            <div className="stat-icon stat-icon-purple">📘</div>
            <div className="stat-text">
              <span className="stat-label">Active Assignments</span>
              <span className="stat-value">{stats.activeAssignments}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-sky">📩</div>
            <div className="stat-text">
              <span className="stat-label">Submissions Received</span>
              <span className="stat-value">{stats.submissionsReceived}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-orange">⏱</div>
            <div className="stat-text">
              <span className="stat-label">Pending Grading</span>
              <span className="stat-value">{stats.pendingGrading}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-green">✅</div>
            <div className="stat-text">
              <span className="stat-label">Graded</span>
              <span className="stat-value">{stats.graded}</span>
            </div>
          </div>
        </section>

        {/* ====== COURSES LIST (so teacher sees what they created) ====== */}
        <section className="panel recent-panel" style={{ marginTop: 20 }}>
          <div className="panel-header">
            <h3>My Courses</h3>
          </div>
          {courses.length === 0 ? (
            <p className="small">No courses yet. Click “+ Course” to add one.</p>
          ) : (
            <div className="grid">
              {courses.map((c) => (
                <div key={c._id} className="course">
                  <h3>{c.title}</h3>
                  <p className="small">Code: {c.code}</p>
                  <p className="small">
                    {c.description || "No description provided."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ====== RECENT ASSIGNMENTS ====== */}
        <section className="panel recent-panel">
          <div className="panel-header">
            <h3>Recent Assignments</h3>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn secondary"
                type="button"
                onClick={() => setMode("course")}
              >
                + Course
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setMode("assignment")}
              >
                + Create New
              </button>
            </div>
          </div>

          {loading && <p className="small">Loading…</p>}

          {!loading && recentAssignments.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h4>No assignments created</h4>
              <p>Get started by creating your first assignment for the class.</p>
            </div>
          )}

          {!loading && recentAssignments.length > 0 && (
            <div className="grid">
              {recentAssignments.map((a) => (
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
        </section>

        {/* ====== FORMS (CREATE COURSE / ASSIGNMENT) ====== */}
        {mode === "course" && (
          <CreateCourse
            onCreated={() => {
              setMode(null);
              loadData(); // reload counts and lists
            }}
          />
        )}
        {mode === "assignment" && (
          <CreateAssignment
            onCreated={() => {
              setMode(null);
              loadData();
            }}
          />
        )}
      </main>
    </div>
  );
}

export default TeacherDashboard;
