const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const upload = require("../helpers/imageHelper");
// const Worker = require("node:worker_threads");
router.get("/", studentController.studentList);
router.get("/studentbyid/:id", studentController.studentById);
router.post("/addstudent", studentController.studentAdd);
router.put("/updatestudent/:id", studentController.studentUpdate);
router.delete("/removestudent/:id", studentController.studentDelete);
router.post("/picstudent", upload.single("image"), studentController.picUpload);
router.post("/multipicstudent", upload.array("images", 5), studentController.multiPicUpload);

module.exports = router;
