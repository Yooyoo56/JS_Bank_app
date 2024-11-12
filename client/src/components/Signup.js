// import React, { useState } from "react";
// import axios from "axios";

// const Signup = () => {
// 	const [name, setName] = useState("");

// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [message, setMessage] = useState("");

// 	const handleSignup = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const response = await axios.post("http://localhost:5500/api/signup", {
// 				email,
// 				password,
// 			});
// 			setMessage(response.data.message || "😘 created user account!!");
// 		} catch (error) {
// 			setMessage(error.response?.data.message || "failed to create account 😣");
// 		}
// 	};

// 	return (
// 		<div>
// 			<h2>💚 Sign up 💚</h2>
// 			<form onSubmit={handleSignup}>
// 				<input
// 					type="text"
// 					placeholder="Name"
// 					value={name}
// 					onChange={(e) => setName(e.target.value)}
// 					required
// 				/>
// 				<input
// 					type="email"
// 					placeholder="example@gmail.com"
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 				/>
// 				<input
// 					type="password"
// 					placeholder="password"
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 				/>
// 				<button type="submit">Sign up </button>
// 			</form>
// 			{message && <p>{message}</p>}
// 		</div>
// 	);
// };

// export default Signup;

import React, { useState } from "react";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// 입력된 데이터 확인
		console.log("Sending data:", { name, email, password });

		try {
			const response = await fetch("http://localhost:5500/api/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || "Signup failed");
				console.error("Error:", data.message);
			} else {
				localStorage.setItem("userName", name);
				alert("Signup successful 😘!");
			}
		} catch (error) {
			console.error("Signup error:", error);
			setError("Network error: " + error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Sign Up</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</form>
	);
};

export default Signup;
