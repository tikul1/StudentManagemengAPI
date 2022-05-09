const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.get("/adminlist", adminController.adminList);
router.get("/admin", adminController.adminById);
router.post("/addadmin", adminController.adminAdd);
router.put("/updateadmin", adminController.adminUpdate);
router.delete("/removeadmin", adminController.adminDelete);

module.exports = router;
