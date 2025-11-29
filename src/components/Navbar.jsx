// src/components/Navbar.jsx
import React from "react";
import { GraduationCap, LogOut, ListChecks } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="nav">
      {/* left logo */}
      <div className="nav-left">
        <div className="nav-logo-circle">
          <GraduationCap size={18} />
        </div>
        <span className="nav-brand">AssignMate</span>
      </div>

      {/* center links */}
      <nav className="nav-center">
        {user.role === "teacher" && (
          <>
            <Link
              to="/teacher/dashboard"
              className={`nav-link ${isActive("/teacher/dashboard") ? "active" : ""}`}
            >
              Dashboard
            </Link>
            <Link
              to="/teacher/grades"
              className={`nav-link ${isActive("/teacher/grades") ? "active" : ""}`}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <ListChecks size={16} />
                Grades
              </span>
            </Link>
          </>
        )}

        {user.role === "student" && (
          <>
            <Link
              to="/student/dashboard"
              className={`nav-link ${isActive("/student/dashboard") ? "active" : ""}`}
            >
              Dashboard
            </Link>
            <Link
              to="/student/dashboard" // or /student/courses if you have that route
              className={`nav-link ${isActive("/student/courses") ? "active" : ""}`}
            >
              My Courses
            </Link>
          </>
        )}
      </nav>

      {/* right user info */}
      <div className="nav-right">
        <div className="nav-user-info">
          <span className="nav-user-name">{user.name}</span>
          <span className="nav-user-role">
            {user.role === "student" ? "Student" : "Teacher"}
          </span>
        </div>
        <div className="nav-avatar">{initial}</div>
        <button className="nav-logout" onClick={onLogout} title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
