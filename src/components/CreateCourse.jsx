// src/components/CreateCourse.jsx
import React, { useState } from "react";
import api from "../services/api";

function CreateCourse({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    teacherName: "Prof. Johnson",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/courses", form);
      console.log("Created course:", res.data);
      alert("Course created!");
      setForm({ ...form, title: "", code: "", description: "" });
      if (onCreated) onCreated();
    } catch (err) {
      console.error(err);
      setError("Failed to save course. Check server console.");
    }
  };

  return (
    <form className="card" style={{ marginTop: 32 }} onSubmit={handleSubmit}>
      <h2>Create Course</h2>

      <input
        name="title"
        placeholder="Course title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="code"
        placeholder="Course code (e.g. CS1203)"
        value={form.code}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Short course description"
        value={form.description}
        onChange={handleChange}
      />

      {error && <p className="small" style={{ color: "red" }}>{error}</p>}

      <button className="btn" type="submit">
        Save Course
      </button>
    </form>
  );
}

export default CreateCourse;
