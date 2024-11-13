import React, { useState, useEffect } from "react";

const ComptesBancaires = ({ token }) => {
	const [comptes, setComptes] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Fetch bank accounts for the logged-in user
	useEffect(() => {
		const fetchComptes = async () => {
			setLoading(true);
			try {
				const response = await fetch("http://localhost:5500/api/accounts", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch accounts");
				}
				const data = await response.json();
				setComptes(data);
			} catch (err) {
				setError("Erreur lors de la récupération des comptes");
				console.error(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchComptes();
	}, [token]);

	return (
		<div>
			<h2>Liste des Comptes Bancaires</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{loading ? (
				<p>Chargement des comptes...</p>
			) : (
				comptes.map((compte) => (
					<div key={compte._id}>
						<h3>
							{compte.accountName} (Propriétaire: {compte.userId.name})
						</h3>
						<p>Solde: {compte.balance}€</p>

						{/* Display transactions if they exist */}
					</div>
				))
			)}
		</div>
	);
};

export default ComptesBancaires;
