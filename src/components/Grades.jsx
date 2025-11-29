// src/components/Grades.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Grades() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(null);
  const [marksInput, setMarksInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/submissions");
      setSubs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load submissions. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (sub) => {
    setEditing(sub._id);
    setMarksInput(sub.marks ?? "");
    setFeedbackInput(sub.feedback ?? "");
  };

  const cancelEdit = () => {
    setEditing(null);
    setMarksInput("");
    setFeedbackInput("");
  };

  const saveGrade = async (id) => {
    try {
      await api.patch(`/submissions/${id}/grade`, {
        marks: marksInput,
        feedback: feedbackInput,
      });
      await fetchSubmissions();
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to save grade.");
    }
  };

  return (
    <div className="dashboard-shell">
      <main className="dashboard-main">
        <h2>Submissions & Grades</h2>

        <div className="card" style={{ marginTop: 24 }}>
          {loading && <p className="small">Loading submissions…</p>}
          {error && (
            <p className="small" style={{ color: "red" }}>
              {error}
            </p>
          )}

          {!loading && subs.length === 0 && !error && (
            <p className="small">No submissions yet.</p>
          )}

          {!loading && subs.length > 0 && (
            <table className="submissions-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Assignment</th>
                  <th>Course</th>
                  <th>Submitted</th>
                  <th>File</th>
                  <th>Marks</th>
                  <th>Feedback</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subs.map((s) => (
                  <tr key={s._id}>
                    <td>{s.studentName}</td>
                    <td>{s.assignment?.title || "-"}</td>
                    <td>
                      {s.assignment?.course
                        ? `${s.assignment.course.title} (${s.assignment.course.code})`
                        : "-"}
                    </td>
                    <td>
                      {s.createdAt
                        ? new Date(s.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td>
                      {s.fileUrl ? (
                        <a
                          href={`http://localhost:5000${s.fileUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="view-link"
                        >
                          View PDF
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      {editing === s._id ? (
                        <input
                          type="number"
                          value={marksInput}
                          onChange={(e) => setMarksInput(e.target.value)}
                          style={{ width: "70px" }}
                        />
                      ) : (
                        s.marks ?? "—"
                      )}
                    </td>
                    <td>
                      {editing === s._id ? (
                        <input
                          value={feedbackInput}
                          onChange={(e) => setFeedbackInput(e.target.value)}
                          style={{ width: "160px" }}
                        />
                      ) : (
                        s.feedback || "—"
                      )}
                    </td>
                    <td>
                      {editing === s._id ? (
                        <>
                          <button
                            className="btn"
                            type="button"
                            style={{ padding: "6px 10px", fontSize: 12 }}
                            onClick={() => saveGrade(s._id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn secondary"
                            type="button"
                            style={{
                              padding: "6px 10px",
                              fontSize: 12,
                              marginLeft: 6,
                            }}
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn secondary"
                          type="button"
                          style={{ padding: "6px 10px", fontSize: 12 }}
                          onClick={() => startEdit(s)}
                        >
                          Grade
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default Grades;
