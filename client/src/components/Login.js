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
			setMessage(error.response?.data.message || "로그인 실패");
		}
	};

	return (
		<div>
			<h2>로그인</h2>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="이메일"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="비밀번호"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">로그인</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default Login;
