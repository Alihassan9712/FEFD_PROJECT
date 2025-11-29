// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: String,
    teacherName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
