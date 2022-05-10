const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const teachers = require("../models/teacherModel");
const loginSchema = require("../helpers/auth");
const Joi = require("joi");

exports.initializingPassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const teacherLogin = await teachers.findOne({ email: email });
          if (teacherLogin) {
            const isMatch = await bcrypt.compare(
              password,
              teacherLogin.password
            );
            if (!isMatch) {
              return done(null, false, {
                Message: "Please enter correct credentials.",
              });
            } else {
              return done(null, teacherLogin);
            }
          } else {
            return done(null, false, {
              Message: "Please enter correct credentials.",
            });
          }
        } catch (error) {
          console.log("error");
        }
      }
    )
  );
};

passport.serializeUser((teacherLogin, done) => {
  done(null, teacherLogin.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await users.findById(id);
    done(null, teacherLogin);
  } catch (error) {
    done(error, false);
  }
});
