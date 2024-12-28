const express = require("express");
const { uploadVoterDetails } = require("../controllers/VoterDetailsController");
const { getDetails } = require("../controllers/VoterDetailsController");
const { getSingleDetails } = require("../controllers/VoterDetailsController");
const { updateVoterDetails } = require("../controllers/VoterDetailsController");
// const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Upload routes
router.post("/uploadData", uploadVoterDetails);
router.post("/getAllVotersData", getDetails);
router.post("/getSingleVoterData", getSingleDetails);
router.post("/updateVoterData", updateVoterDetails);

module.exports = router;
