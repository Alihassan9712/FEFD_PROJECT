// assignmate3.0/src/components/CreateAssignment.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

function CreateAssignment({ onCreated }) {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    course: "",
    title: "",
    description: "",
    dueDate: "",
    maxMarks: 100,
  });

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/assignments", form);
    alert("Assignment created!");
    setForm({ ...form, title: "", description: "", dueDate: "" });
    if (onCreated) onCreated();
  };

  return (
    <div className="card" style={{ marginTop: 32 }}>
      <h2>Create Assignment</h2>

      <select
        name="course"
        value={form.course}
        onChange={handleChange}
        required
      >
        <option value="">Select course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.title} ({c.code})
          </option>
        ))}
      </select>

      <input
        name="title"
        placeholder="Assignment title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Instructions / questions"
        value={form.description}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <input
        type="number"
        name="maxMarks"
        value={form.maxMarks}
        onChange={handleChange}
        placeholder="Max marks"
      />

      <button className="btn" onClick={handleSubmit}>
        Save Assignment
      </button>
    </div>
  );
}

export default CreateAssignment;
