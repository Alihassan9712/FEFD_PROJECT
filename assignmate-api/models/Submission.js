const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    studentName: { type: String, required: true },

    fileUrl: String,        // "/uploads/xyz123.pdf"
    originalName: String,   // original filename

    marks: Number,
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
