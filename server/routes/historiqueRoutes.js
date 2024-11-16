const express = require('express');
const { getHistoriqueConnexions } = require('../controllers/historiqueController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
// historiques
router.get('/', authMiddleware, getHistoriqueConnexions);

module.exports = router;
