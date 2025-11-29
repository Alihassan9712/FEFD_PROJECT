// assignmate-api/routes/assignmateRoutes.js
const express = require("express");
const multer = require("multer");

const Course = require("../models/Course");
const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

const router = express.Router();

/* ---------- MULTER CONFIG FOR FILE UPLOAD ---------- */

const upload = multer({ dest: "uploads/" }); // files go to /uploads folder

/* -------- COURSES -------- */

// POST /api/courses  -> create course
router.post("/courses", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/courses -> list all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -------- ASSIGNMENTS -------- */

// POST /api/assignments  -> create assignment
router.post("/assignments", async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/assignments?courseId=...  -> list assignments
router.get("/assignments", async (req, res) => {
  try {
    const { courseId } = req.query;
    const query = courseId ? { course: courseId } : {};
    const assignments = await Assignment.find(query)
      .populate("course", "title code")
      .sort({ createdAt: -1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* -------- SUBMISSIONS -------- */

// (1) JSON submission (link-based) – optional, keep if you still use it
router.post("/submissions", async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// (2) FILE UPLOAD submission (drag & drop sends here)
router.post(
  "/submissions/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const { assignment, studentName } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
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
      res.status(400).json({ message: err.message });
    }
  }
);

// GET /api/submissions?assignmentId=&studentName=
router.get("/submissions", async (req, res) => {
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
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/submissions/:id/grade  -> teacher gives marks + feedback
router.patch("/submissions/:id/grade", async (req, res) => {
  try {
    const { marks, feedback } = req.body;
    const updated = await Submission.findByIdAndUpdate(
      req.params.id,
      { marks, feedback },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
