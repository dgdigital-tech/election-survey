const mongoose = require("mongoose");

const VoterDetails = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  phone: String,
});

const Voters = mongoose.model("Voter", VoterDetails);
module.exports = Voters;
