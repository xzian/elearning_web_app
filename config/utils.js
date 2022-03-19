const Answer = require("../models/answer");
const User = require("../models/user");
const Task = require("../models/task");

// Compare submitted answers with the solutions in the database,
// then return some statistic results
async function compareAnswers(submittedAnswers) {
  const solutionDocument = await Answer.findOne({
    unit: submittedAnswers.unit,
  });
  let correctCount = 0;
  let incorrectCount = 0;
  let submittedCount = 0;

  let answers = {};
  let answer = {};

  if (solutionDocument) {
    for (const key in solutionDocument.solutions) {
      if (key in submittedAnswers.submitted) {
        submittedCount++;
        if (
          solutionDocument.solutions[key] == submittedAnswers.submitted[key]
        ) {
          correctCount++;
          answer["correct-answer"] = submittedAnswers.submitted[key];
          answer["class"] = "correct-answer";
        } else {
          incorrectCount++;
          answer["incorrect-answer"] = submittedAnswers.submitted[key];
          answer["class"] = "incorrect-answer";
        }
      } else {
        answer["unanswered-answer"] = solutionDocument.solutions[key];
        answer["class"] = "unanswered-answer";
      }
      answers[key] = answer;
      answer = {};
    }
  }
  let unansweredCount =
    Object.keys(solutionDocument.solutions).length - submittedCount;

  return {
    unit: submittedAnswers.unit,
    submitted: submittedCount,
    correct: correctCount,
    incorrect: incorrectCount,
    unanswered: unansweredCount,
    answers: answers,
  };
}

// Save the results in the database
async function saveResult(exams) {
  const found = await User.find({
    _id: exams.userId,
    exams: {
      unit: exams.results.unit,
      submitted: exams.results.submitted,
      correct: exams.results.correct,
      incorrect: exams.results.incorrect,
      unanswered: exams.results.unanswered,
      answers: exams.results.answers,
    },
  });
  if (found) {
    await User.updateOne(
      { _id: exams.userId },
      { $pull: { exams: { unit: exams.results.unit } } }
    );
  }
  await User.updateOne(
    { _id: exams.userId },
    { $push: { exams: exams.results } }
  );
}

async function loadExamTasks(unit) {
  return await Task.findOne({ unit: unit });
}

module.exports.compareAnswers = compareAnswers;
module.exports.saveResult = saveResult;
module.exports.loadExamTasks = loadExamTasks;
