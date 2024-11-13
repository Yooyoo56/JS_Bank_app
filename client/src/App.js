import React, { useState } from "react";
import { Route, Routes } from "react-router-dom"; // No need to wrap it in BrowserRouter here
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import ComptesBancaires from "./components/ComptesBancaires"; // Importer le composant

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
				{/* Nouvelle route pour les comptes bancaires */}
				<Route
					path="/accounts"
					element={token ? <ComptesBancaires /> : <Login setToken={setToken} />}
				/>
			</Routes>
		</>
	);
};

export default App;
