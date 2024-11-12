const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	logoutUser,
} = require("../controllers/authControllers");

// 사용자 등록 라우트
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
