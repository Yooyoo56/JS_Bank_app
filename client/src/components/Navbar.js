import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		setToken("");
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to="/home">Home</Link>
				</li>
				{token && (
					<>
						<li>
							<Link to="/comptes-bancaires">Comptes Bancaires</Link>
						</li>
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					</>
				)}
				{!token && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;