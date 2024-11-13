import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
	// Handle logout functionality by clearing token from localStorage and resetting token in the state
	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove token from localStorage
		setToken(""); // Clear token from state
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to="/home">Home</Link>
				</li>

				{/* Show Comptes Bancaires and Transactions links and logout button if user is logged in */}
				{token && (
					<>
						<li>
							<Link to="/accounts">Comptes Bancaires</Link>
						</li>
						<li>
							<Link to="/transactions">Transactions</Link>{" "}
							{/* New Transactions link */}
						</li>
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					</>
				)}

				{/* Show login/signup links if user is not logged in */}
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
