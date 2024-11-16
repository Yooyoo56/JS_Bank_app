// routes/userRoutes.js
const express = require("express");
const router = express.Router();
//middleware
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/profile", auth, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
});

// Route to update user profile
router.put("/profile/update", auth, async (req, res) => {
	const { name, email } = req.body;
	const userId = req.userId; // Get userId from the JWT token

	if (!name || !email) {
		return res.status(400).json({ message: "Name and email are required." });
	}

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		// Update user details
		user.name = name;
		user.email = email;

		await user.save(); // Save the updated user to the database

		res
			.status(200)
			.json({ success: true, message: "Profile updated successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating profile." });
	}
});

module.exports = router;