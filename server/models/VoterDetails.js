const mongoose = require("mongoose");

const VoterDetails = new mongoose.Schema({
  epicId: String,
  name: String,
  caste: String,
  contactNo: String,
  houseNo: String,
  age: Number,
  partyInclination: String,
});

const Voters = mongoose.model("Voter", VoterDetails);
module.exports = Voters;
