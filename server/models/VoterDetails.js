const mongoose = require("mongoose");

const VoterDetails = new mongoose.Schema({
  epicID: String,
  name: String,
  cast: String,
  connect: String,
  houseno: String,
  age: Number,
  partyInclination: String,
});

const Voters = mongoose.model("Voter", VoterDetails);
module.exports = Voters;
