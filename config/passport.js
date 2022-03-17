const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = require("../models/user");
const validatePassword = require("../lib/passwordUtils").validatePassword;

const verifyCallback = (email, password, done) => {
  User.findOne({ email: email })
    .then(async (user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = await validatePassword(password, user.password);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

passport.use(new LocalStrategy({ usernameField: "email" }, verifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
