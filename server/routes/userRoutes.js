// routes/userRoutes.js
const express = require("express");
const { getUserDetails } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", protect, getUserDetails);

module.exports = router;
