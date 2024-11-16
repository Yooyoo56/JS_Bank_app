const mongoose = require("mongoose");

const compteBancaireSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: { type: String, required: true },
		nomCompte: {
			type: String,
			required: true,
		},
		solde: {
			type: Number,
			default: 0,
		},
		typeCompte: {
			type: String,
			required: true, // Ce champ est obligatoire
			enum: ['Courant', 'Épargne'], // Liste des types possibles
			default: 'Courant' // Valeur par défaut si non spécifiée
		},
		seuil: {
			type: Number,
			default: 0, // Valeur par défaut du seuil
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("CompteBancaire", compteBancaireSchema);