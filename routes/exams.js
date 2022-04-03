const compareAnswers = require("../config/utils").compareAnswers;
const saveResult = require("../config/utils").saveResult;
const express = require("express");
const router = express.Router();

const Exam = require("../models/exam");

router
  .route("/:unit")
  .get(checkAuthenticated, async (req, res) => {
    const exam = await Exam.findOne({ unit: req.params.unit });
    if (exam) {
      res.render("exams", { user: req.user, exam: exam });
    } else {
      res.redirect("/");
    }
  })
  .post(processSubmission, (req, res) => {
    res.redirect(`/exams/${req.params.unit}/results`);
  });

//TODO: add final exam in database
router.get("/:exam/results", checkAuthenticated, async (req, res) => {
  const exam = await Exam.findOne({ unit: req.params.exam });
  if (exam) {
    res.render("exams/results", { user: req.user, exam: exam });
  } else {
    res.redirect("/");
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/login");
}

async function processSubmission(req, res, next) {
  if (req.originalUrl.split("/")[2]) {
    const examResults = await compareAnswers({
      unit: req.originalUrl.split("/")[2],
      submitted: req.body,
    });
    await saveResult({ userId: req.user.id, results: examResults });
    return next();
  } else {
    return res.redirect("/");
  }
}

module.exports = router;
