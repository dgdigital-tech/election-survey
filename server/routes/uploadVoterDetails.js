const express = require("express");
const { uploadVoterDetails } = require("../controllers/VoterDetailsController");
// const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Upload routes
router.post("/uploadData", uploadVoterDetails);

module.exports = router;
