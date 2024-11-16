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

const deleteCompteBancaire = async (req, res) => {
    const { compteId } = req.params; // ID du compte à supprimer
    const userId = req.userId; // ID de l'utilisateur, récupéré depuis le token JWT

    try {
        // Vérifier si le compte appartient à l'utilisateur
        const compte = await CompteBancaire.findOne({ _id: compteId, userId });
        if (!compte) {
            return res.status(404).json({ message: "Compte bancaire introuvable ou non autorisé." });
        }

        // Supprimer toutes les transactions liées à ce compte
        await Transaction.deleteMany({ compteId });

        // Supprimer le compte bancaire
        await CompteBancaire.findByIdAndDelete(compteId);

        // Optionnel : Mettre à jour un solde total global (si nécessaire)
        const comptesRestants = await CompteBancaire.find({ userId });
        const soldeTotal = comptesRestants.reduce((acc, compte) => acc + compte.solde, 0);

        res.status(200).json({
            message: "Compte bancaire supprimé avec succès.",
            soldeTotal,
        });
    } catch (error) {
        console.error("Erreur lors de la suppression du compte bancaire :", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};



module.exports = {
	getComptesBancaires,deleteCompteBancaire
};