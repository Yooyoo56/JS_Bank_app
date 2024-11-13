// client/src/components/AddTransaction.js
import React, { useState } from "react";

const AddTransaction = ({ token, accountId }) => {
	const [type, setType] = useState("deposit");
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (amount <= 0) {
			setError("Le montant doit être un nombre positif.");
			return;
		}

		const transactionData = {
			accountId,
			type,
			amount,
			description,
		};

		try {
			const response = await fetch("http://localhost:5500/api/transaction", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(transactionData),
			});

			if (!response.ok) {
				throw new Error("Failed to add transaction");
			}

			const data = await response.json();
			setSuccess("Transaction ajoutée avec succès !");
			setError("");
			setAmount(""); // Reset form fields after success
			setDescription("");
		} catch (err) {
			setError("Erreur lors de l'ajout de la transaction");
			setSuccess("");
		}
	};

	return (
		<div>
			<h2>Ajouter une transaction</h2>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{success && <p style={{ color: "green" }}>{success}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Type de transaction:
					<select value={type} onChange={(e) => setType(e.target.value)}>
						<option value="deposit">Dépôt</option>
						<option value="withdrawal">Retrait</option>
					</select>
				</label>
				<br />
				<label>
					Montant:
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
				</label>
				<br />
				<label>
					Description:
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<br />
				<button type="submit">Ajouter la transaction</button>
			</form>
		</div>
	);
};

export default AddTransaction;
