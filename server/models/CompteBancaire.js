const mongoose = require("mongoose");

// Bank Account schema
const compteBancaireSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // Reference to the User model
		required: true,
	},
	accountName: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		required: true,
		default: 0,
	},
	transactions: [
		{
			type: {
				type: String,
				enum: ["credit", "debit"],
				required: true,
			},
			amount: { type: Number, required: true },
			date: { type: Date, default: Date.now },
			description: { type: String },
		},
	],
});

module.exports = mongoose.model("CompteBancaire", compteBancaireSchema);
