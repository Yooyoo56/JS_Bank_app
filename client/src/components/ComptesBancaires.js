import React, { useEffect, useState } from "react";
import axios from "axios";

const ComptesBancaires = () => {
	const [comptes, setComptes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchComptes = async () => {
			try {
				// Récupérer le token du localStorage
				const token = localStorage.getItem("token");
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				// Assurez-vous d'utiliser le bon port (celui du backend)
				const response = await axios.get(
					"http://localhost:5500/api/accounts/comptes",
					config
				);
				setComptes(response.data);
			} catch (error) {
				setError("Erreur lors de la récupération des comptes");
				console.error("Erreur:", error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchComptes();
	}, []);

	if (loading) return <p>Chargement...</p>;

	if (error) return <p>{error}</p>;

	return (
		<div>
			<h2>Mes Comptes Bancaires</h2>
			<ul>
				{comptes.map((compte) => (
					<li key={compte._id}>
						<strong>Nom du compte :</strong> {compte.nom} -{" "}
						<strong>Solde :</strong> {compte.solde} €
					</li>
				))}
			</ul>
		</div>
	);
};

export default ComptesBancaires;
