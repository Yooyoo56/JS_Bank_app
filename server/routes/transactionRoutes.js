const express = require("express");
const router = express.Router();
const {
    ajouterTransaction,
    consulterHistorique,
    downloadAllTransactions,
    downloadAccountTransactions,
} = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/", authMiddleware, ajouterTransaction);
router.get("/download-all", authMiddleware, downloadAllTransactions);
router.get("/:compteId", authMiddleware, consulterHistorique);
router.get("/download/:accountId", authMiddleware, downloadAccountTransactions);

module.exports = router;
