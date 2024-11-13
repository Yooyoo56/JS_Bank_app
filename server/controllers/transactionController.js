// server/controllers/transactionController.js
const Transaction = require("../models/Transaction");
const CompteBancaire = require("../models/CompteBancaire");

// Add a transaction (deposit or withdrawal)
const addTransaction = async (req, res) => {
	try {
		const { accountId, type, amount, description } = req.body;

		// Find the account
		const compte = await CompteBancaire.findById(accountId);

		if (!compte) {
			return res.status(404).json({
				message: "Compte bancaire non trouvé.",
			});
		}

		// Check if the amount is valid for a withdrawal
		if (type === "withdrawal" && amount > compte.balance) {
			return res.status(400).json({
				message: "Solde insuffisant pour effectuer ce retrait.",
			});
		}

		// Create the transaction
		const newTransaction = new Transaction({
			type,
			amount,
			description,
			accountId,
		});

		// Save the transaction
		await newTransaction.save();

		// Update the bank account balance
		if (type === "deposit") {
			compte.balance += amount;
		} else if (type === "withdrawal") {
			compte.balance -= amount;
		}

		// Save the updated account balance
		await compte.save();

		res.status(200).json({
			message: "Transaction ajoutée avec succès.",
			transaction: newTransaction,
		});
	} catch (error) {
		console.error("Error adding transaction:", error.message);
		res.status(500).json({
			message: "Erreur lors de l'ajout de la transaction.",
		});
	}
};

module.exports = {
	addTransaction,
};
