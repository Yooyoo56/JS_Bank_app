const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// routers
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/compteBancaireRoutes"); //
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");


const app = express();

// localhost (client port = 3000)
// middleware
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
	.then(() => console.log("MongoDB connected! ✅"))
	.catch((err) => console.log("MongoDB connection failed! 😣:", err));

app.use("/api", authRoutes,);
// account route
app.use("/api", accountRoutes);

app.use("/api", userRoutes);

app.use("/api", transactionRoutes);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server is connected to ${PORT} ✅`));
