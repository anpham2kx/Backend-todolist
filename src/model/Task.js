const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Vui lòng nhập nội dung công việc"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", TaskSchema);
