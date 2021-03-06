const express = require("express");
const router = express.Router();
// Password hashing
const genPassword = require("../lib/passwordUtils").genPassword;
// Passport authentication
const passport = require("passport");
require("../config/passport");
// Database access (User collection)
require("../config/database");
const User = require("../models/user");

// Get the login route and access to the input data
router.get("/login", (req, res) => {
  const errors = req.flash().error;
  res.render("users/login", { user: new User(), errors });
});

// Get the registration route and
// access to the input data
router.get("/register", (req, res) => {
  res.render("users/register", { user: new User() });
});

router.get("/profile", checkAuthenticated, (req, res) => {
  res.render("users/profile", { user: req.user });
});

// Look for user in the database
// when the login form has been submitted
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

// Create new user and add them to
// the database when the registration
// form has been submitted
router.post("/register", async (req, res) => {
  let hashedPassword = null;

  if (req.body.password) {
    hashedPassword = await genPassword(req.body.password);
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.redirect("/users/login");
  } catch (e) {
    res.render("users/register", {
      user: user,
      errorMessage: {
        what: "Your account could not be registered.",
        help: "Make sure to fill in both your username, email and password.",
      },
    });
  }
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/users/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/login");
}

module.exports = router;
