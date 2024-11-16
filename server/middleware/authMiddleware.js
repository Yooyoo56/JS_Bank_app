const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	// console.log("test");
	const token = req.headers.authorization?.split(" ")[1]; // Récupère le token du header

	if (!token) {
		return res
			.status(401)
			.json({ message: "Accès non autorisé, token manquant" });
	}

	try {
		// Vérifiez le token avec votre clé secrète
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId; // Ajoute l'userId au req

		console.log(" userId: "+req.userId);
		next();
	} catch (error) {
		console.error("Erreur d'authentification:", error.message);
		return res.status(401).json({ message: "Token invalide ou expiré" });
	}
};

module.exports = authMiddleware;
