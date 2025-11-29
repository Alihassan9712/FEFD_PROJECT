// src/components/Auth.jsx
import React, { useState } from "react";
import api from "../services/api";

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      if (mode === "register") {
        const res = await api.post("/auth/register", {
          name,
          email,
          password,
          role,
        });
        onLogin(res.data); // {id,name,email,role}
      } else {
        const res = await api.post("/auth/login", { email, password });
        onLogin(res.data);
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Server error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero">
      <div className="card" style={{ maxWidth: 480 }}>
        <h2>{mode === "login" ? "Sign in to AssignMate" : "Create an account"}</h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button
            type="button"
            className={`btn secondary ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`btn secondary ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div style={{ margin: "10px 0" }}>
                <label className="small">Register as:</label>
                <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                  <label className="small">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === "student"}
                      onChange={(e) => setRole(e.target.value)}
                    />{" "}
                    Student
                  </label>
                  <label className="small">
                    <input
                      type="radio"
                      name="role"
                      value="teacher"
                      checked={role === "teacher"}
                      onChange={(e) => setRole(e.target.value)}
                    />{" "}
                    Teacher
                  </label>
                </div>
              </div>
            </>
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="small" style={{ color: "red", marginTop: 4 }}>
              {error}
            </p>
          )}

          <button className="btn" type="submit" disabled={loading} style={{ marginTop: 16 }}>
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
