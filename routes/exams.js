const compareAnswers = require("../config/utils").compareAnswers;
const saveResult = require("../config/utils").saveResult;
const express = require("express");
const router = express.Router();

const Exam = require("../models/exam");

router
  .route("/one")
  .get(checkAuthenticated, async (req, res) => {
    const exam = await Exam.findOne({ unit: "one" });
    res.render("exams", { user: req.user, exam: exam });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/results/one");
    // res.redirect("/exams/one/results");
  });

router
  .route("/two")
  .get(checkAuthenticated, async (req, res) => {
    const exam = await Exam.findOne({ unit: "two" });
    res.render("exams", { user: req.user, exam: exam });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/results/two");
    // res.redirect("/exams/two/results");
  });

router
  .route("/three")
  .get(checkAuthenticated, async (req, res) => {
    const exam = await Exam.findOne({ unit: "three" });
    res.render("exams", { user: req.user, exam: exam });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/results/three");
    // res.redirect("/exams/three/results");
  });

// TODO: change 3 to final
router
  .route("/final")
  .get(checkAuthenticated, async (req, res) => {
    const exam = await Exam.findOne({ unit: "three" });
    res.render("exams", { user: req.user, exam: exam });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/results/final");
    // res.redirect("/exams/final/results");
  });

router.get("/results/:exam", checkAuthenticated, async (req, res) => {
  const exam = await Exam.findOne({ unit: req.params.exam });
  res.render("exams/results", { user: req.user, exam: exam });
});

// router.get("/one/results", checkAuthenticated, async (req, res) => {
//   const exam = await Exam.findOne({ unit: "one" });
//   res.render("exams/results", { user: req.user, exam: exam });
// });

// router.get("/two/results", checkAuthenticated, async (req, res) => {
//   const exam = await Exam.findOne({ unit: "two" });
//   res.render("exams/results", { user: req.user, exam: exam });
// });

// router.get("/three/results", checkAuthenticated, async (req, res) => {
//   const exam = await Exam.findOne({ unit: "three" });
//   res.render("exams/results", { user: req.user, exam: exam });
// });

// // TODO: change 3 to final
// router.get("/final/results", checkAuthenticated, async (req, res) => {
//   const exam = await Exam.findOne({ unit: "three" });
//   res.render("exams/results", { user: req.user, exam: exam });
// });

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
