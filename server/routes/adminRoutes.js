const express = require("express");
const { createSubAdmin } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin routes
router.post("/subadmins", protect, authorize("SuperAdmin"), createSubAdmin);

module.exports = router;
