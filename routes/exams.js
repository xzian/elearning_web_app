const compareAnswers = require("../config/utils").compareAnswers;
const saveResult = require("../config/utils").saveResult;
const { request } = require("express");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("exams/index", { user: req.user });
});

router
  .route("/one")
  .get((req, res) => {
    res.render("exams/one", { user: req.user });
  })
  .post((req, res) => {
    res.redirect("/exams/one");
  });

router
  .route("/two")
  .get((req, res) => {
    res.render("exams/two", { user: req.user });
  })
  .post((req, res) => {
    res.redirect("/exams/two");
  });

router
  .route("/three")
  .get((req, res) => {
    res.render("exams/three", { user: req.user });
  })
  .post((req, res) => {
    res.redirect("/exams/three");
  });

router.route("/one/results").get((req, res) => {
  res.render("exams/one/results", { user: req.user });
});

router.route("/one/:exercise").post(async (req, res) => {
  const unit = "one";
  const userAnswers = req.body;

  const examResults = await compareAnswers({
    unit: unit,
    submitted: userAnswers,
  });
  await saveResult({ userId: req.user.id, results: examResults });
  console.log(userAnswers);
  console.log(examResults);

  res.redirect("/exams/one/results");
});

router.route("/two/:exercise").post(async (req, res) => {
  const unit = "two";
  const userAnswers = req.body;

  const results = await compareAnswers({ unit: unit, submitted: userAnswers });

  res.redirect("/exams/two");
});

router.route("/three/:exercise").post(async (req, res) => {
  const unit = "three";
  const userAnswers = req.body;

  const results = await compareAnswers({ unit: unit, submitted: userAnswers });

  res.redirect("/exams/three");
});

module.exports = router;
