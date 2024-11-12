const CompteBancaire = require("../models/CompteBancaire");
const Transaction = require("../models/Transaction");

// Récupérer les comptes bancaires de l'utilisateur connecté
const getComptesBancaires = async (req, res) => {
	try {
		const comptes = await CompteBancaire.find({ userId: req.user._id }); // On suppose que l'utilisateur est authentifié et son ID est dans req.user
		res.status(200).json(comptes);
	} catch (error) {
		res
			.status(500)
			.json({
				message: "Erreur lors de la récupération des comptes bancaires.",
			});
	}
};

// Récupérer les transactions d'un compte bancaire spécifique
const getTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.find({
			compteBancaireId: req.params.compteId,
		});
		res.status(200).json(transactions);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Erreur lors de la récupération des transactions." });
	}
};

module.exports = {
	getComptesBancaires,
	getTransactions,
};
