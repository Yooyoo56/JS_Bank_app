const express = require("express");
const {
	getHistoriqueConnexions,
} = require("../controllers/historiqueController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Define the route for history
router.get("/history", authMiddleware, getHistoriqueConnexions);

module.exports = router;
