const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  unit: String,
  unitHeading: String,
  unitNumber: String,
  formId: String,
  formRedirect: String,
  exerciseOne: {
    exerciseContainerClass: String,
    exerciseHeading: String,
    questions: [
      {
        label: String,
        selectId: String,
        selectName: String,
      },
    ],
  },
  exerciseTwo: {
    exerciseContainerClass: String,
    exerciseHeading: String,
    questions: [
      {
        pDescription: String,
        checkBoxOptions: [
          { label: String, optionId: String, optionName: String },
        ],
      },
    ],
  },
  exerciseThree: {
    exerciseContainerClass: String,
    exerciseHeading: String,
    questions: [
      {
        label: String,
        selectId: String,
        selectName: String,
        answerInRow: String,
      },
    ],
  },
});

module.exports = mongoose.model("Exam", examSchema, "exams");
