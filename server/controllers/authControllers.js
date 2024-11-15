const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // jwt 모듈 임포트 추가
const User = require("../models/User");
const validator = require("validator");

// For register user // sign up
const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	console.log("Received data:", { name, email, password });

	// mandatory verification
	if (!name) {
		return res.status(400).json({ message: "Name is required" });
	}

	// Email validation
	if (!validator.isEmail(email)) {
		return res.status(400).json({ message: "Invalid email address!" });
	}

	// password length should be more than 8
	if (password.length < 8) {
		return res
			.status(400)
			.json({ message: "Password should be more than 8 characters" });
	}

	// Same email verification
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(400).json({ message: "Already using email" }); // Return JSON error
	}

	// Hashed password
	const hashedPassword = await bcrypt.hash(password, 10);

	// New user
	const newUser = new User({
		name,
		email,
		password: hashedPassword,
	});

	try {
		await newUser.save(); // Add user info in MongoDB
		res.status(201).json({ message: "🎉 Successfully created account! 🎉" });
	} catch (error) {
		console.error("Error during creating the account:", error.message);
		res.status(500).json({ message: "Server error" }); // Return JSON error
	}
};

// USER LOGIN
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid mail." });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid password." });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ token, message: "Login success" });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// USER LOGOUT
const logoutUser = (req, res) => {
	res.status(200).json({ message: "🎉 Successfully logout!" });
};

// // Update User Profile
// const updateUserProfile = async (req, res) => {
// 	const { name, email } = req.body;
// 	const userId = req.userId; // Set by authMiddleware

// 	try {
// 		const user = await User.findById(userId);
// 		if (!user) {
// 			return res.status(404).json({ message: "User not found" });
// 		}

// 		// Update user information
// 		user.name = name || user.name;
// 		user.email = email || user.email;

// 		// Save updated user to the database
// 		const updatedUser = await user.save();

// 		res.status(200).json({
// 			message: "Profile updated successfully",
// 			user: {
// 				id: updatedUser._id,
// 				name: updatedUser.name,
// 				email: updatedUser.email,
// 			},
// 		});
// 	} catch (error) {
// 		console.error("Error updating profile:", error.message);
// 		res.status(500).json({ message: "Server error" });
// 	}
// };

// Get User Profile
const getUserProfile = async (req, res) => {
	const userId = req.userId;

	try {
		const user = await User.findById(userId).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error("Error fetching profile:", error.message);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	getUserProfile,
	// updateUserProfile,
};
