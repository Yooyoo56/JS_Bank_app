import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5500/api/signup", {
				email,
				password,
			});
			setMessage(response.data.message || "회원가입 성공!");
		} catch (error) {
			setMessage(error.response?.data.message || "회원가입 실패");
		}
	};

	return (
		<div>
			<h2>회원가입</h2>
			<form onSubmit={handleSignup}>
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
				<button type="submit">회원가입</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default Signup;
