import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goStudent = () => navigate("/auth?role=student");
  const goTeacher = () => navigate("/auth?role=teacher");

  return (
    <div className="home">
      {/* Top bar */}
      <header className="home-topbar">
        <div className="home-brand">
          <div className="home-logo">A</div>
          <span className="home-name">AssignMate</span>
        </div>

        <nav className="home-nav">
          <button className="home-nav-link" onClick={goStudent}>
            Student
          </button>
          <button className="home-nav-link" onClick={goTeacher}>
            Teacher
          </button>
          <button className="home-nav-primary" onClick={goStudent}>
            Get started
          </button>
        </nav>
      </header>

      {/* Main hero section */}
      <main className="home-main">
        <section className="home-hero">
          <p className="home-pill">Simple online assignment portal</p>

          <h1 className="home-title">
            Submit, manage and grade assignments in one clean interface.
          </h1>

          <p className="home-subtitle">
            Students can upload work and track results. Teachers can create
            assignments, view submissions and share feedback — all from a
            single dashboard.
          </p>

          <div className="home-actions">
            <button className="btn-primary" onClick={goStudent}>
              I&apos;m a student
            </button>
            <button className="btn-secondary" onClick={goTeacher}>
              I&apos;m a teacher
            </button>
          </div>
        </section>

        {/* Role cards */}
        <section className="home-grid">
          <div className="home-card home-card-student" onClick={goStudent}>
            <h3>Student view</h3>
            <p>
              See enrolled courses, upcoming deadlines and submitted
              assignments in a clear list.
            </p>
            <ul>
              <li>Upload PDFs or images</li>
              <li>Check grades and feedback</li>
              <li>Never miss a due date</li>
            </ul>
          </div>

          <div className="home-card home-card-teacher" onClick={goTeacher}>
            <h3>Teacher view</h3>
            <p>
              Create assignments, review submissions and record grades without
              dealing with emails.
            </p>
            <ul>
              <li>Manage courses & sections</li>
              <li>Open all submissions in one place</li>
              <li>Share marks and comments quickly</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
