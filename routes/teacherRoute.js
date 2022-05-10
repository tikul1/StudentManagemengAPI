const express = require("express");
const router = express.Router();
const jwtHelper = require("../helpers/jwtHelper");
const teacherController = require("../controllers/teacherController");
const passport = require("passport");

router.post("/a", passport.authenticate("local"), teacherController.login);
router.get("/", jwtHelper.verifyToken, teacherController.teacherList);
router.get("/teacher", teacherController.teacherById);
router.post("/addteacher", teacherController.teacherAdd);
router.put("/updateteacher/:id", teacherController.teacherUpdate);
router.delete("/removeteacher/:id", teacherController.teacherDelete);

module.exports = router;
