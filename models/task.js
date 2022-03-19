const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
  },
  tasks: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema, "tasks");
