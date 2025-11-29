// assignmate-api/models/Assignment.js
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    maxMarks: { type: Number, default: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
