const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	logoutUser,
} = require("../controllers/authControllers");

// 사용자 등록 라우트
router.post("/signup", registerUser);
// 로그인 라우트
router.post("/login", loginUser);
// 로그아웃 라우트
router.post("/logout", logoutUser);

module.exports = router;
