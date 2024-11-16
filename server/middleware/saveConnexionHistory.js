const HistoriqueConnexion = require("../models/HistoriqueConnexion");
const geoip = require("geoip-lite");

const saveConnexionHistory = async (req) => {
    try {
        // Récupérer l'adresse IP
        const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const geo = geoip.lookup(ipAddress);
        const location = geo ? `${geo.city}, ${geo.country}` : "Unknown";
        console.log(ipAddress);

        // Vérifier si c'est une connexion suspecte
        const previousConnections = await HistoriqueConnexion.find({ userId: req.userId })
            .sort({ date: -1 })
            .limit(1);
        console.log("last ip :"+previousConnections);
        
        let isSuspicious = false;
        if (previousConnections.length > 0) {
            const previousLocation = previousConnections[0].location;
            if (previousLocation !== location) {
                isSuspicious = true;
                // Envoyer un message d'alerte (exemple avec console.log)
                console.log(`ALERTE : Connexion suspecte détectée pour l'utilisateur ${req.userId}`);
            }
        }

        // Enregistrer l'historique de connexion
        const historique = new HistoriqueConnexion({
            userId: req.userId,
            ip: ipAddress,
            location,
            isSuspicious,
        });

        // Sauvegarder dans la base de données
        await historique.save();
        console.log("Historique enregistré:", historique);

    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'historique de connexion :", error);
    }
};

module.exports = saveConnexionHistory;
