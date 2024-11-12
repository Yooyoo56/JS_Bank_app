const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
	{
		compteBancaireId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "CompteBancaire",
			required: true,
		},
		montant: {
			type: Number,
			required: true,
		},
		typeTransaction: {
			type: String, // 'débit' ou 'crédit'
			required: true,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Transaction", transactionSchema);
