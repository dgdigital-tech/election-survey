const express = require("express");
const multer = require("multer");
const fs = require("fs"); // Import fs to check/create folder
const path = require("path");
const { uploadVoterDetails } = require("../controllers/VoterDetailsController");

const router = express.Router();

// Ensure uploads folder exists, or create it if not
const uploadFolderPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolderPath)) {
  fs.mkdirSync(uploadFolderPath); // Create uploads folder if it doesn't exist
}

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolderPath); // Use the dynamically created folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Define the route for CSV upload
router.post("/uploadData", upload.single("file"), uploadVoterDetails); // 'file' is the field name in form-data

module.exports = router;

// const express = require("express");
// const { uploadVoterDetails } = require("../controllers/VoterDetailsController");
// const { getDetails } = require("../controllers/VoterDetailsController");
// const { getSingleDetails } = require("../controllers/VoterDetailsController");
// const { updateVoterDetails } = require("../controllers/VoterDetailsController");
// // const { protect, authorize } = require("../middleware/authMiddleware");

// const router = express.Router();

// // Upload routes
// router.post("/uploadData", uploadVoterDetails);
// router.post("/getAllVotersData", getDetails);
// router.post("/getSingleVoterData", getSingleDetails);
// router.post("/updateVoterData", updateVoterDetails);

// module.exports = router;
