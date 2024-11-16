const HistoriqueConnexion = require('../models/HistoriqueConnexion');

const getHistoriqueConnexions = async (req, res) => {
    try {
        const historique = await HistoriqueConnexion.find({ userId: req.userId }).sort({ date: -1 });
        res.status(200).json(historique);
    } catch (error) {
        console.error('Error fetching connection history:', error);
        res.status(500).json({ message: 'Error fetching connection history.' });
    }
};

module.exports = {
    getHistoriqueConnexions,
};
