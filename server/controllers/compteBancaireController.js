const CompteBancaire = require("../models/CompteBancaire"); // Bank account model
const Transaction = require("../models/Transaction"); // Transaction model

// Get bank accounts for the logged-in user
const getComptesBancaires = async (req, res) => {
	try {
		// Find accounts associated with the logged-in user (userId comes from JWT)

		const comptes = await CompteBancaire.find({ userId: req.userId }).populate(
			"userId",
			"name"
		);
		console.log("/////////////"+req.userId+"///" +comptes);

		if (!comptes || comptes.length === 0) {
			return res.status(200).json({
			  message: "Aucun compte bancaire pour cet utilisateur.",
			  comptes: []  // Retourne un tableau vide
			});
		}

		res.json(comptes);
	} catch (error) {
		console.error("Error fetching accounts:", error.message);
		res.status(500).json({
			message: "Erreur lors de la récupération des comptes bancaires",
		});
	}
};

module.exports = {
	getComptesBancaires,
};