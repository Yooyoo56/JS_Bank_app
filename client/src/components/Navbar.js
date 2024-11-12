import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
	const handleLogout = () => {
		setToken(null); // Clear token from state
		localStorage.removeItem("token"); // Remove token from localStorage
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to="/home">Home</Link>
				</li>
				{!token ? (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				) : (
					<li>
						<button onClick={handleLogout}>Logout</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
