import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5500/api/login", {
				email,
				password,
			});
			const token = response.data.token;
			setToken(token);
			localStorage.setItem("token", token);
			navigate("/home"); // 로그인 성공 시 홈으로 이동
		} catch (error) {
			setMessage(error.response?.data.message || "Login failed");
		}
	};

	return (
		<div>
			<h2>🩵 Login🩵 </h2>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="example@gmail.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default Login;
