const CompteBancaire = require("../models/CompteBancaire"); // Bank account model
const Transaction = require("../models/Transaction"); // Transaction model

// Get bank accounts for the logged-in user
const getComptesBancaires = async (req, res) => {
	try {
		// Find accounts associated with the logged-in user (userId comes from JWT)
		const comptes = await CompteBancaire.find({ userId: req.user.id }).populate(
			"userId",
			"name"
		);

		if (!comptes.length) {
			return res.status(404).json({
				message: "Aucun compte bancaire trouvé pour cet utilisateur.",
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
