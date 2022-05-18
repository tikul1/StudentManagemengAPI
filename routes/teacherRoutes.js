const express = require("express");
const router = express.Router();
const jwtHelper = require("../helpers/jwtHelper");
const teacherController = require("../controllers/teacherController");
const passport = require("passport");

router.post(
  "/passport",
  passport.authenticate("local"),
  teacherController.login
);
router.get("/jwt", jwtHelper.verifyToken, teacherController.teacherList);
router.get("/searchteacher/:id", teacherController.teacherById);
router.post("/addteacher", teacherController.teacherAdd);
router.put("/updateteacher/:id", teacherController.teacherUpdate);
router.delete("/removeteacher/:id", teacherController.teacherDelete);

module.exports = router;
