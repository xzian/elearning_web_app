const connection = require("../config/database");
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
  },
  solutions: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Answer", answerSchema, "answers");
