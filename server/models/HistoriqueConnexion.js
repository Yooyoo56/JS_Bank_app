const mongoose = require('mongoose');

const HistoriqueConnexionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: 'Unknown',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isSuspicious: { type: Boolean, default: false },

});

module.exports = mongoose.model('HistoriqueConnexion', HistoriqueConnexionSchema);
