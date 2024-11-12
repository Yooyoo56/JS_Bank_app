// 필요한 라이브러리들
require("dotenv").config(); // .env 파일 로드
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// 환경변수
const { JWT_SECRET, MONGODB_URI, PORT } = process.env;

const app = express();

// 미들웨어
app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결
mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log("MongoDB connection error:", err));

// 라우터 설정
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// 서버 시작
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
