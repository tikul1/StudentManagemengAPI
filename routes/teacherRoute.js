const express = require("express");
const router = express.Router();
const jwtHelper = require("../helpers/jwtHelper");
const teacherController = require("../controllers/teacherController");
router.get("/", jwtHelper.verifyToken, teacherController.teacherList);
router.get("/teacher", teacherController.teacherById);
router.post("/addteacher", teacherController.teacherAdd);
router.put("/updateteacher/:id", teacherController.teacherUpdate);
router.delete("/removeteacher/:id", teacherController.teacherDelete);
// router.post("/login", teacherController.teacherLogin);
// router.get("/jwt", jwtHelper.verifyToken, teacherController.teacherList);

module.exports = router;
