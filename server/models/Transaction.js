const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        compteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CompteBancaire",
            required: true,
        },
        type: {
            type: String,
            enum: ["Dépôt", "Retrait"],
            required: true,
        },
        montant: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value > 0;
                },
                message: "Le montant doit être positif.",
            },
        },
        date: {
            type: Date,
            default: Date.now,
        },
        soldeAprèsTransaction: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);