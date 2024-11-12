require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

// localhost (client port = 3000)
app.use(
	cors({
		origin: "http://localhost:3000", // 프론트엔드 React 앱의 주소
		methods: ["GET", "POST"],
		credentials: true,
	})
);
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB 연결 성공"))
	.catch((err) => console.log("MongoDB 연결 실패:", err));

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`));
