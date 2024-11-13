// routes/compteBancaireRoutes.js
const express = require("express");
const router = express.Router();
const {
	getComptesBancaires,
} = require("../controllers/compteBancaireController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to get bank accounts of logged-in user
router.get("/accounts", authMiddleware, getComptesBancaires);

module.exports = router;
