// assignmate-api/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");

// MODELS
const Course = require("./models/Course");
const Assignment = require("./models/Assignment");
const Submission = require("./models/Submission");
const User = require("./models/User");

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// serve uploaded files statically (for View PDF links)
app.use("/uploads", express.static("uploads"));

// Multer config: store uploaded files in "uploads" folder
const upload = multer({ dest: "uploads/" });

// ---------- MONGODB CONNECTION ----------
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

/* ===================== AUTH (LOGIN / REGISTER) ===================== */

// POST /api/auth/register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || "student",
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(400).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* ===================== COURSES ===================== */

// POST /api/courses  -> create course
app.post("/api/courses", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create course" });
  }
});

// GET /api/courses -> list all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

/* ===================== ASSIGNMENTS ===================== */

// POST /api/assignments  -> create assignment
app.post("/api/assignments", async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create assignment" });
  }
});

// GET /api/assignments?courseId=...  -> list assignments
app.get("/api/assignments", async (req, res) => {
  try {
    const { courseId } = req.query;
    const query = courseId ? { course: courseId } : {};

    const assignments = await Assignment.find(query)
      .populate("course", "title code")
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

/* ===================== SUBMISSIONS ===================== */

// JSON endpoint (optional)
app.post("/api/submissions", async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).json(submission);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to submit assignment" });
  }
});

// FILE UPLOAD endpoint (drag & drop)
app.post(
  "/api/submissions/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const { assignment, studentName } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;

      const submission = await Submission.create({
        assignment,
        studentName,
        fileUrl,
        originalName: req.file.originalname,
      });

      res.status(201).json(submission);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Failed to upload submission" });
    }
  }
);

// GET /api/submissions?assignmentId=&studentName=
app.get("/api/submissions", async (req, res) => {
  try {
    const { assignmentId, studentName } = req.query;
    const query = {};
    if (assignmentId) query.assignment = assignmentId;
    if (studentName) query.studentName = studentName;

    const subs = await Submission.find(query).populate({
      path: "assignment",
      select: "title dueDate",
      populate: { path: "course", select: "title code" },
    });

    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// PATCH /api/submissions/:id/grade -> teacher gives marks + feedback
app.patch("/api/submissions/:id/grade", async (req, res) => {
  try {
    const { marks, feedback } = req.body;
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { marks, feedback },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to grade submission" });
  }
});

/* ===================== ROOT & START ===================== */

app.get("/", (req, res) => {
  res.send("AssignMate API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 API server listening on port ${PORT}`);
});
