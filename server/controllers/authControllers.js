const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // jwt 모듈 임포트 추가
const User = require("../models/User");

// For register user // sign up
const registerUser = async (req, res) => {
	const { email, password } = req.body;

	// 이메일 유효성 검사
	if (!validator.isEmail(email)) {
		return res.status(400).send("Invalid email address!");
	}

	// 비밀번호 길이 검사 (8자 이상)
	if (password.length < 8) {
		return res.status(400).send("Password should be more than 8");
	}

	// 이메일 중복 확인
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(400).send("Already using email");
	}

	// 비밀번호 해싱
	const hashedPassword = await bcrypt.hash(password, 10);

	// 새로운 사용자 생성
	const newUser = new User({
		email,
		password: hashedPassword,
	});

	try {
		await newUser.save(); // Add user info in MongoDB

		res.status(201).send("🎉 Successfully created account !🎉 ");
	} catch (error) {
		console.error("Error during creating the account:", error.message);
		res.status(500).send("server error");
	}
};

// USER LOGIN
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ token, message: "로그인 성공" });
	} catch (error) {
		console.error("로그인 오류:", error);
		res.status(500).json({ message: "서버 오류" });
	}
};

// USER LOGOUT
const logoutUser = (req, res) => {
	res.status(200).json({ message: "🎉 Successfully logout!" });
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
};
