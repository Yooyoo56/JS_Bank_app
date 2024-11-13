// server/routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const { addTransaction } = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware"); // Authorization middleware

// Route to add a transaction
router.post("/transaction", authMiddleware, addTransaction);

module.exports = router;
