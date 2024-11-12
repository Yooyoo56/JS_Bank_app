// const express = require("express");
// const {
// 	getComptesBancaires,
// 	getTransactions,
// } = require("../controllers/compteBancaireController");
// const authMiddleware = require("../middleware/authMiddleware"); // Middleware pour vérifier si l'utilisateur est authentifié

// const router = express.Router();

// // Récupérer les comptes bancaires de l'utilisateur connecté
// router.get("/comptes", authMiddleware, getComptesBancaires);

// // Récupérer les transactions d'un compte bancaire spécifique
// router.get("/comptes/:compteId/transactions", authMiddleware, getTransactions);

// module.exports = router;

// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const Account = require("../models/CompteBancaire");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware pour protéger la route

// Route pour récupérer tous les comptes bancaires de l'utilisateur connecté
router.get("/comptes", authMiddleware, async (req, res) => {
	try {
		// `userId` doit être défini dans le middleware `authMiddleware`
		const userId = req.userId;
		if (!userId) {
			return res.status(401).json({ message: "Utilisateur non authentifié" });
		}

		// Recherchez les comptes bancaires par `userId`
		const comptes = await Account.find({ userId });
		res.status(200).json(comptes);
	} catch (error) {
		console.error("Erreur lors de la récupération des comptes:", error.message);
		res
			.status(500)
			.json({ message: "Erreur lors de la récupération des comptes" });
	}
});

module.exports = router;
