const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.studentList);
router.get("/studentbyid/:id", studentController.studentById);
router.post("/addstudent", studentController.studentAdd);
router.put("/updatestudent/:id", studentController.studentUpdate);
router.delete("/removestudent/:id", studentController.studentDelete);

module.exports = router;
