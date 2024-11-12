const mongoose = require("mongoose");

const compteBancaireSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		nomCompte: {
			type: String,
			required: true,
		},
		solde: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("CompteBancaire", compteBancaireSchema);
