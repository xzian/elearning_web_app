const mongoose = require("mongoose");
const Answer = require("../models/answer");
const User = require("../models/user");

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
          //answers.correctAnswers.push(key);
          answer["key"] = key;
          answer["correct"] = solutionDocument.solutions[key];
          answer["class"] = "correct-answer";
        } else {
          incorrectCount++;
        }
      } else {
        //answers.incorrectAnswers.push(key);
        answer["key"] = key;
        answer["correct"] = solutionDocument.solutions[key];
        answer["incorrect"] = submittedAnswers.submitted[key];
        answer["class"] = "incorrect-answer";
      }
      answers[key] = answer;
    }
  }
  let unansweredCount =
    Object.keys(solutionDocument.solutions).length - submittedCount;

  //console.log(`Submitted Answers: ${submittedCount}`);
  //console.log(`Correct Answers: ${correctCount}`);
  //console.log(`Incorrect Answers: ${incorrectCount}`);
  //console.log(`Unanswered: ${unansweredCount}`);

  return {
    unit: submittedAnswers.unit,
    submitted: submittedCount,
    correct: correctCount,
    incorrect: incorrectCount,
    unanswered: unansweredCount,
    answers: answers,
  };
}

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

module.exports.compareAnswers = compareAnswers;
module.exports.saveResult = saveResult;