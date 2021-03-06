const Answer = require("../models/answer");
const exam = require("../models/exam");
const Exam = require("../models/exam");
const User = require("../models/user");

// Compare submitted answers with the solutions in the database,
// then return some statistic results
async function compareAnswers(submittedAnswers) {
  const examCollection = await Exam.findOne({ unit: submittedAnswers.unit });

  let unitTitle, unitNumber;
  if (examCollection) {
    unitTitle = examCollection.unitHeading;
    unitNumber = examCollection.unitNumber;
  }

  const solutionDocument = await Answer.findOne({
    unit: submittedAnswers.unit,
  });
  let correctCount = 0;
  let incorrectCount = 0;
  let submittedCount = 0;
  let totalCorrectSolutions = 0;

  let answers = {};
  let answer = {};

  if (solutionDocument) {
    for (const key in solutionDocument.solutions) {
      if (solutionDocument.solutions[key] != "") totalCorrectSolutions++;
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
          answer["correct-answer"] = solutionDocument.solutions[key];
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
    unitTitle: unitTitle,
    unit: submittedAnswers.unit,
    unitNumber: unitNumber,
    submitted: submittedCount,
    correct: correctCount,
    incorrect: incorrectCount,
    unanswered: unansweredCount,
    answers: answers,
    solutions: totalCorrectSolutions,
  };
}

// Save the results in the database
async function saveResult(exams) {
  const found = await User.find({
    _id: exams.userId,
    exams: {
      unitTitle: exams.results.unitTitle,
      unit: exams.results.unit,
      unitNumber: exams.results.unitNumber,
      submitted: exams.results.submitted,
      correct: exams.results.correct,
      incorrect: exams.results.incorrect,
      unanswered: exams.results.unanswered,
      answers: exams.results.answers,
      solutions: exams.results.solutions,
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

module.exports.compareAnswers = compareAnswers;
module.exports.saveResult = saveResult;
