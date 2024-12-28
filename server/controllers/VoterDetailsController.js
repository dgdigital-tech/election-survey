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
