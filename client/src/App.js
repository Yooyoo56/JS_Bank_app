import React, { useState } from "react";
import { Route, Routes } from "react-router-dom"; // No need to wrap it in BrowserRouter here
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";

const App = () => {
	const [token, setToken] = useState(localStorage.getItem("token") || "");

	return (
		<>
			<Navbar token={token} setToken={setToken} />
			<Routes>
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route
					path="/home"
					element={token ? <Home /> : <Login setToken={setToken} />}
				/>
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</>
	);
};

export default App;
