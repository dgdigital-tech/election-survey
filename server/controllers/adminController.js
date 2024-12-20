const User = require("../models/User");

// Create Sub-Admin (WardAdmin or BoothAdmin)
exports.createSubAdmin = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    if (!["WardAdmin", "BoothAdmin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    user = new User({ name, email, password, phone, role });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: `${role} created successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
