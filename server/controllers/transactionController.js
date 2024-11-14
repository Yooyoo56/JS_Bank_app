const CompteBancaire = require("../models/CompteBancaire");
const Transaction = require("../models/Transaction");

async function ajouterTransaction(req, res) {
    try {
        const { compteId, type, montant } = req.body;
        const compte = await CompteBancaire.findById(compteId);

        if (!compte) {
            return res.status(404).json({ message: "Compte non trouvé." });
        }

        let nouveauSolde = compte.solde;
        if (type === "Retrait") {
            if (montant > compte.solde) {
                return res.status(400).json({ message: "Solde insuffisant." });
            }
            nouveauSolde -= montant;
        } else {
            nouveauSolde += montant;
        }

        const transaction = new Transaction({
            compteId,
            type,
            montant,
            soldeAprèsTransaction: nouveauSolde,
        });
        await transaction.save();

        compte.solde = nouveauSolde;
        await compte.save();

        res.status(201).json({ message: "Transaction ajoutée avec succès.", transaction });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la transaction.", error });
    }
}
async function consulterHistorique(req, res) {
    try {
        const { compteId } = req.params;
        const { type, date } = req.query;

        let filtres = { compteId };
        if (type) filtres.type = type;
        if (date) filtres.date = { $gte: new Date(date) };

        const transactions = await Transaction.find(filtres).sort({ date: -1 });

        if (transactions.length === 0) {
            return res.status(404).json({ message: "Aucune transaction trouvée selon le filtre." });
        }

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la consultation de l'historique.", error });
    }
}



module.exports = { ajouterTransaction , consulterHistorique};