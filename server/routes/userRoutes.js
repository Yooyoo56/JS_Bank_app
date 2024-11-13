const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authenticating requests

// Endpoint to get user profile
router.get("/user", authMiddleware, async (req, res) => {
  try {
    // Retrieve user ID from the token (assuming middleware attaches it to req.userId)
    const user = await User.findById(req.userId).select("name email"); // Fetch only needed fields
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
