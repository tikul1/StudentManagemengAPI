const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const teachers = require("../models/teacherModel");
const { loginSchema } = require("../helpers/auth");
const passportError = require("./apiError");

exports.initializingPassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const { email, password } = req.body;
          const result = await loginSchema.validateAsync(req.body);
          const teacherLogin = await teachers.findOne({
            email: result.email,
          });
          if (teacherLogin) {
            const isMatch = await bcrypt.compare(
              password,
              teacherLogin.password
            );
            if (!isMatch) {
              return done(null, false, {
                Message: "please enter correct credentials.",
              });
            } else {
              return done(null, teacherLogin);
            }
          } else {
            return done(null, false, {
              Message: "please enter correct credentials.",
            });
          }
        } catch (e) {
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
