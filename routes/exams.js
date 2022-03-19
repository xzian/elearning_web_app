const compareAnswers = require("../config/utils").compareAnswers;
const saveResult = require("../config/utils").saveResult;
const loadExamTasks = require("../config/utils").loadExamTasks;
const express = require("express");
const router = express.Router();

router
  .route("/one")
  .get(checkAuthenticated, async (req, res) => {
    const exam = req.originalUrl.split("/")[2];
    const examTasks = await loadExamTasks(exam);
    res.render("exams", {
      user: req.user,
      examId: `exam-${exam}`,
      exam: examTasks,
      unitNum: "1",
      unitStr: exam,
    });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/results");
  });

router
  .route("/two")
  .get(checkAuthenticated, async (req, res) => {
    const exam = req.originalUrl.split("/")[2];
    const examTasks = await loadExamTasks(exam);
    res.render("exams", {
      user: req.user,
      examId: `exam-${exam}`,
      exam: examTasks,
      unitNum: "2",
      unitStr: exam,
    });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/results");
  });

router
  .route("/three")
  .get(checkAuthenticated, async (req, res) => {
    const exam = req.originalUrl.split("/")[2];
    const examTasks = await loadExamTasks(exam);
    res.render("exams", {
      user: req.user,
      examId: `exam-${exam}`,
      exam: examTasks,
      unitNum: "3",
      unitStr: exam,
    });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/results");
  });

router.get("/results", checkAuthenticated, (req, res) => {
  res.render("exams/results", { user: req.user });
});

router.get("/results", checkAuthenticated, (req, res) => {
  res.render("exams/results", { user: req.user });
});

router.get("/results", checkAuthenticated, (req, res) => {
  res.render("exams/results", { user: req.user });
});

router.get("/results/:exam", checkAuthenticated, async (req, res) => {
  const examTasks = await loadExamTasks(req.params.exam);
  res.render("/exams/results", {
    user: req.user,
    examId: `exam-${req.params.exam}`,
    exam: examTasks,
    unitNum: `${req.params.exam}`,
    unitStr: req.params.exam,
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
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
