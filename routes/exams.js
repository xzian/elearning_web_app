const compareAnswers = require("../config/utils").compareAnswers;
const saveResult = require("../config/utils").saveResult;
const express = require("express");
const router = express.Router();

router
  .route("/one")
  .get(checkAuthenticated, (req, res) => {
    res.render("exams/one", { user: req.user });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/one/results");
  });

router
  .route("/two")
  .get(checkAuthenticated, (req, res) => {
    res.render("exams/two", { user: req.user });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/two/results");
  });

router
  .route("/three")
  .get(checkAuthenticated, (req, res) => {
    res.render("exams/three", { user: req.user });
  })
  .post(processSubmission, (req, res) => {
    res.redirect("/exams/three/results");
  });

router.get("/one/results", checkAuthenticated, (req, res) => {
  res.render("exams/one/results", { user: req.user });
});

router.get("/two/results", checkAuthenticated, (req, res) => {
  res.render("exams/two/results", { user: req.user });
});

router.get("/three/results", checkAuthenticated, (req, res) => {
  res.render("exams/two/results", { user: req.user });
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
