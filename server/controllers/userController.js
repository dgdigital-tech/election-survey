// controllers/userController.js
const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
