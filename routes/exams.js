const compareAnswers = require("../config/utils").compareAnswers;
const saveResult = require("../config/utils").saveResult;
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("exams", { user: req.user });
});

router
  .route("/one")
  .get(checkAuthenticated, (req, res) => {
    res.render("exams/one", { user: req.user });
  })
  .post((req, res) => {
    res.redirect("/exams/one");
  });

router
  .route("/two")
  .get(checkAuthenticated, (req, res) => {
    res.render("exams/two", { user: req.user });
  })
  .post((req, res) => {
    res.redirect("/exams/two");
  });

router
  .route("/three")
  .get(checkAuthenticated, (req, res) => {
    res.render("exams/three", { user: req.user });
  })
  .post((req, res) => {
    res.redirect("/exams/three");
  });

router.get("/one/results", checkAuthenticated, (req, res) => {
  res.render("exams/one/results", { user: req.user });
});

router.get("/two/results", checkAuthenticated, (req, res) => {
  res.render("exams/two/results", { user: req.user });
});

router.get("/one/results", checkAuthenticated, (req, res) => {
  res.render("exams/two/results", { user: req.user });
});

router.route("/one/:exercise").post(async (req, res) => {
  const unit = "one";
  const userAnswers = req.body;

  const examResults = await compareAnswers({
    unit: unit,
    submitted: userAnswers,
  });
  await saveResult({ userId: req.user.id, results: examResults });

  res.redirect("/exams/one/results");
});

router.route("/two/:exercise").post(async (req, res) => {
  const unit = "two";
  const userAnswers = req.body;

  const examResults = await compareAnswers({
    unit: unit,
    submitted: userAnswers,
  });
  await saveResult({ userId: req.user.id, results: examResults });

  res.redirect("/exams/two");
});

router.route("/three/:exercise").post(async (req, res) => {
  const unit = "three";
  const userAnswers = req.body;

  const examResults = await compareAnswers({
    unit: unit,
    submitted: userAnswers,
  });
  await saveResult({ userId: req.user.id, results: examResults });

  res.redirect("/exams/three");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/exams");
}

module.exports = router;
