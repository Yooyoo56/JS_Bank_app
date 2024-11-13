import React, { useEffect, useState } from "react";
import axios from "axios";


const Home = () => {
	const [userName, setUserName] = useState("");

	useEffect(() => {
		// Retrieve the name from localStorage
		const name = localStorage.getItem("userName");
		if (name) {
			setUserName(name); // Set the name in state
		} else {
			// If not found in localStorage, fetch from the database
			const fetchUserName = async () => {
				try {
					// Replace this URL with your actual endpoint
					const response = await axios.get("http://localhost:5500/api/user");
					const fetchedName = response.data.name;
					
					// Store the name in both localStorage and state
					localStorage.setItem("userName", fetchedName);
					setUserName(fetchedName);
				} catch (error) {
					console.error("Error fetching user name:", error);
				}
			};

			fetchUserName();
		}
	}, []); // Empty dependency array ensures it runs only once when component mounts

	return (
		<div>
			<h2>Welcome, {userName}!</h2>
		</div>
	);
};

export default Home;
