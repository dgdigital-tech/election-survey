const Voters = require("../models/VoterDetails");

exports.uploadVoterDetails = async (req, res) => {
  try {
    const data = req.body; // Data sent from the frontend (React Native)
    console.log(data);

    // Insert the data into MongoDB
    // const insertedData = await Voters.insertMany(data);

    // console.log("Data inserted:", insertedData);
    res.status(200).json({ message: "Data uploaded successfully" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ message: "Failed to upload data" });
  }
};

// Get all voters
exports.getDetails = async (req, res) => {
  try {
    const data = await Voters.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching voters", error: err });
  }
};

// Get a single voter by ID
exports.getSingleDetails = async (req, res) => {
  try {
    const voter = await Voters.findById(req.params.id);
    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }
    res.status(200).json(voter);
  } catch (err) {
    res.status(500).json({ message: "Error fetching voter", error: err });
  }
};

// Update voter details
exports.updateVoterDetails = async (req, res) => {
  const { contactNo, caste, age, partyInclination } = req.body;

  try {
    const updatedVoter = await Voters.findByIdAndUpdate(
      req.params.id,
      { contactNo, caste, age, partyInclination },
      { new: true }
    );
    if (!updatedVoter) {
      return res.status(404).json({ message: "Voter not found" });
    }
    res.status(200).json({
      message: "Voter details updated successfully",
      voter: updatedVoter,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating voter details", error: err });
  }
};
