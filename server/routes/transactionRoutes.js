// server/routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const { ajouterTransaction , consulterHistorique } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware"); // Authorization middleware

// Route to add a transaction
// router.post("/ajouterTransaction", authMiddleware, ajouterTransaction);

// router.get("/consulterHistorique", authMiddleware, consulterHistorique);

router.post("/transactions", authMiddleware ,ajouterTransaction); // Route pour ajouter une transaction
router.get("/transactions/:compteId", authMiddleware, consulterHistorique);

//router.get("/transaction", authMiddleware, addTransaction); //test a verifier

module.exports = router;
