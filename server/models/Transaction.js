// server/models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ["deposit", "withdrawal"], // Two types: deposit or withdrawal
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		description: {
			type: String,
		},
		accountId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "CompteBancaire", // Linking transaction to the specific bank account
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Transaction", transactionSchema);
