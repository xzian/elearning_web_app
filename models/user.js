const connection = require("../config/database");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  exams: [{ type: Object, required: true }],
});

module.exports = mongoose.model("User", userSchema, "users");
