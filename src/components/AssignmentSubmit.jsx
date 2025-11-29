// src/components/AssignmentSubmit.jsx
import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";

function AssignmentSubmit({ studentName = "John Doe" }) {
  const [assignments, setAssignments] = useState([]);
  const [assignmentId, setAssignmentId] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // load assignments once
  useEffect(() => {
    api
      .get("/assignments")
      .then((res) => setAssignments(res.data))
      .catch((err) => {
        console.error("Error loading assignments:", err);
        alert("Failed to load assignments. Check backend.");
      });
  }, []);

  const handleSelectChange = (e) => setAssignmentId(e.target.value);

  // drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assignmentId) {
      alert("Please select an assignment.");
      return;
    }
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("assignment", assignmentId);
    formData.append("studentName", studentName);
    formData.append("file", file); // <-- must be "file" to match multer.single("file")

    try {
      setLoading(true);

      const res = await api.post("/submissions/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload response:", res.data);
      alert("Assignment submitted successfully!");

      setFile(null);
      // optional: clear select
      // setAssignmentId("");
    } catch (err) {
      console.error("Upload error:", err);
      if (err.response) {
        console.error("Server response:", err.response.data);
        alert(
          "Upload failed: " +
            (err.response.data.error || err.response.data.message || "Server error")
        );
      } else {
        alert("Upload failed. Check the backend console.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: 32 }}>
      <h2>Submit Assignment</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={assignmentId}
          onChange={handleSelectChange}
          required
          style={{ marginBottom: 20 }}
        >
          <option value="">Select assignment</option>
          {assignments.map((a) => (
            <option key={a._id} value={a._id}>
              {a.title}
            </option>
          ))}
        </select>

        {/* Drag & Drop zone */}
        <div
          className={`file-upload ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleZoneClick}
        >
          <p>
            {file
              ? `Selected: ${file.name}`
              : "Drag & drop file here, or click to browse"}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AssignmentSubmit;
