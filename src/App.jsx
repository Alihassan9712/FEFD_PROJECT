// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import Grades from "./components/Grades";

import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  // Load simple fake session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("assignmate_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("assignmate_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("assignmate_user");
    setUser(null);
  };

  // If not logged in, show auth screen
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app-root">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-shell">
        <Routes>
          {user.role === "student" && (
            <>
              <Route
                path="/student/dashboard"
                element={<StudentDashboard user={user} />}
              />
              {/* default redirect for any other path */}
              <Route
                path="*"
                element={<Navigate to="/student/dashboard" replace />}
              />
            </>
          )}

          {user.role === "teacher" && (
            <>
              <Route
                path="/teacher/dashboard"
                element={<TeacherDashboard user={user} />}
              />
              <Route
                path="/teacher/grades"
                element={<Grades user={user} />}
              />
              {/* default redirect for any other path */}
              <Route
                path="*"
                element={<Navigate to="/teacher/dashboard" replace />}
              />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}
