const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.get("/", adminController.adminList);
router.get("/admin", adminController.adminById);
router.post("/addadmin", adminController.adminAdd);
router.put("/updateadmin/:id", adminController.adminUpdate);
router.delete("/removeadmin/:id", adminController.adminDelete);
router.post("/login", adminController.adminLogin);

module.exports = router;
