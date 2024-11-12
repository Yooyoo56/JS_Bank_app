import React, { useEffect, useState } from "react";

const Home = () => {
	const [userName, setUserName] = useState("");

	useEffect(() => {
		// Retrieve the name from localStorage
		const name = localStorage.getItem("userName");
		if (name) {
			setUserName(name); // Set the name in state
		}
	}, []); // Empty dependency array ensures it runs only once when component mounts

	return (
		<div>
			<h2>Welcome, {userName}!</h2>
		</div>
	);
};

export default Home;
