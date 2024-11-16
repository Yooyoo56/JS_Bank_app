const HistoriqueConnexion = require("../models/HistoriqueConnexion");
const geoip = require("geoip-lite");
const axios = require("axios");
const { sendAlertEmail } = require("../services/emailService");

const knownLocations = {}; // Stockez les localisations précédentes par utilisateur

const getIpAddress = async (req) => {
    // Check headers for x-forwarded-for first (useful for proxies)
    let ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.connection.remoteAddress;

    if (ipAddress === "::1" || ipAddress === "127.0.0.1") {
        // Use Ipify if localhost is detected
        const response = await axios.get("https://api.ipify.org?format=json");
        ipAddress = response.data.ip; // Get public IP
    }

    return ipAddress;
};
const saveConnexionHistory = async (req) => {
    try {
        const ipAddress = await getIpAddress(req);
        const geo = geoip.lookup(ipAddress);
        const location = geo ? `${geo.city}, ${geo.country}` : "Unknown";
        console.log("IP Address:", ipAddress);

        // Vérifier si c'est une connexion suspecte
        const previousConnections = await HistoriqueConnexion.find({ userId: req.userId })
            .sort({ date: -1 })
            .limit(1);
        console.log("Previous connections:", previousConnections);
        
        let isSuspicious = false;
        if (previousConnections.length > 0) {
            const previousLocation = previousConnections[0].location;
            if (previousLocation !== location) {
                isSuspicious = true;
                console.log(`ALERTE : Connexion suspecte détectée pour l'utilisateur ${req.userId}`);
            }
        }

        // Check for suspicious login and send email
        if (isSuspicious && req.userEmail) {
            console.log("Sending alert email to:", req.userEmail);
            try {
                await sendAlertEmail(
                    req.userEmail,
                    location
                );
                console.log("Alert email sent successfully");
            } catch (emailError) {
                console.error("Failed to send alert email:", emailError);
                // Continue execution even if email fails
            }
        }

        // Update known locations
        if (req.userId) {
            knownLocations[req.userId] = geo ? geo.city : "Unknown";
        }

        // Save connection history
        const historique = new HistoriqueConnexion({
            userId: req.userId,
            ip: ipAddress,
            location,
            isSuspicious,
        });

        await historique.save();
        console.log("Connection history saved:", historique);

    } catch (error) {
        console.error("Error saving connection history:", error);
        throw error; // Rethrow to handle in the calling function
    }
};

module.exports = saveConnexionHistory;
