const CompteBancaire = require("../models/CompteBancaire");
const Transaction = require("../models/Transaction");
const fs = require("fs");
const path = require("path");
const { createObjectCsvWriter } = require("csv-writer");

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
        console.log("compte id :"+compteId)

        if (transactions.length === 0) {
            return res.status(404).json({ message: "Aucune transaction trouvée selon le filtre. 2" });
        }
        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la consultation de l'historique.", error });
    }
}

// Download all transactions for all user accounts
const downloadAllTransactions = async (req, res) => {
    const userId = req.userId;

    try {
        console.log("userid " +userId);
        const accounts = await CompteBancaire.find({ userId });
        
        if (!accounts.length) {
            return res.status(404).json({ message: "No accounts found for this user." });
        }

        const accountMap = accounts.reduce((map, account) => {
            map[account._id] = account.nomCompte;
            return map;
        }, {});

        const accountIds = accounts.map((account) => account._id);
        const transactions = await Transaction.find({ compteId: { $in: accountIds } });

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found for this user." });
        }

        const csvWriter = createObjectCsvWriter({
            path: path.join(__dirname, `../downloads/all_transactions_${userId}.csv`),
            header: [
                { id: "date", title: "Date" },
                { id: "type", title: "Type" },
                { id: "montant", title: "Montant" },
                { id: "solde", title: "Solde" },
                { id: "compteId", title: "Account ID" },
                { id: "accountName", title: "Account Name" },
            ],
        });

        const data = transactions.map((transaction) => ({
            date: transaction.date.toISOString(),
            type: transaction.type,
            montant: transaction.montant,
            solde: transaction.soldeAprèsTransaction,
            compteId: transaction.compteId,
            accountName: accountMap[transaction.compteId],
        }));

        await csvWriter.writeRecords(data);

        const filePath = path.join(__dirname, `../downloads/all_transactions_${userId}.csv`);
        res.download(filePath, `all_transactions_${userId}.csv`, (err) => {
            if (err) {
                console.error("Error during file download:", err);
                return res.status(500).json({ message: "Error during file download." });
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error("Error downloading all transactions:", error);
        res.status(500).json({ message: "Error downloading transactions.", error });
    }
};

// Download transactions for a specific account
const downloadAccountTransactions = async (req, res) => {
    const { accountId } = req.params;

    try {
        const transactions = await Transaction.find({ compteId: accountId });
        
        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found for this account." });
        }

        const csvWriter = createObjectCsvWriter({
            path: path.join(__dirname, `../downloads/transactions_${accountId}.csv`),
            header: [
                { id: "date", title: "Date" },
                { id: "type", title: "Type" },
                { id: "montant", title: "Montant" },
                { id: "solde", title: "Solde" },
            ],
        });

        const data = transactions.map((transaction) => ({
            date: transaction.date.toISOString(),
            type: transaction.type,
            montant: transaction.montant,
            solde: transaction.soldeAprèsTransaction,
        }));

        await csvWriter.writeRecords(data);

        const filePath = path.join(__dirname, `../downloads/transactions_${accountId}.csv`);
        res.download(filePath, `transactions_${accountId}.csv`, (err) => {
            if (err) {
                console.error("Error during file download:", err);
                return res.status(500).json({ message: "Error during file download." });
            }
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Error fetching transactions.", error });
    }
};

module.exports = {
    ajouterTransaction,
    consulterHistorique,
    downloadAllTransactions,
    downloadAccountTransactions,
};