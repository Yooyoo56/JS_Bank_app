// routes/accountRoutes.js
const express = require("express");
const router = express.Router();
const Account = require("../models/CompteBancaire");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware pour protéger la route
// const { createAccount } = require('../controllers/compteBancaireController'); // Import du controller

// Route pour récupérer tous les comptes bancaires de l'utilisateur connecté
router.get("/", authMiddleware, async (req, res) => {
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

// Route pour créer un compte bancaire
router.post("/add-account", authMiddleware, async (req, res) => {
  const { name, nomCompte, typeCompte } = req.body;
  const userId = req.userId; // Récupérer le userId du middleware

  try {
    console.log("newAccount");

    // Créer une nouvelle instance du modèle CompteBancaire avec les informations envoyées
    const newAccount = new Account({
      userId,
      name,
      nomCompte,
      solde: 0, // Solde par défaut à 0
      typeCompte, // Utilisation de la valeur envoyée ou du type par défaut
    });

    // Sauvegarder dans la base de données
    console.log(newAccount);
    await newAccount.save();

    // Réponse après la création du compte
    res.status(201).json({ message: "Compte bancaire créé avec succès", compte: newAccount });
  } catch (err) {
    console.error("Erreur lors de la création du compte bancaire:", err);
    res.status(500).json({ message: "Erreur lors de la création du compte bancaire", error: err });
  }
});

router.get('/:compteId/seuil', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // Récupéré depuis le middleware d'authentification
    const compte = await Account.findOne({ _id: req.params.compteId, userId });

    if (!compte) {
      return res.status(404).json({ error: 'Compte non trouvé ou non autorisé' });
    }

    res.json({ seuil: compte.seuil });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Endpoint pour mettre à jour le seuil d'un compte
router.put('/:compteId/seuil', async (req, res) => {
  const { seuil } = req.body;
  try {
    const compte = await Account.findByIdAndUpdate(
      req.params.compteId,
      { seuil },
      { new: true }
    );
    if (!compte) {
      return res.status(404).json({ error: 'Compte non trouvé' });
    }
    res.json({ message: 'Seuil mis à jour', compte });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
