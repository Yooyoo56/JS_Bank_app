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
			setMessage(response.data.message || "😘 created user account!!");
		} catch (error) {
			setMessage(error.response?.data.message || "failed to create account 😣");
		}
	};

	return (
		<div>
			<h2>💚 Sign up 💚</h2>
			<form onSubmit={handleSignup}>
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
				<button type="submit">Sign up </button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default Signup;
