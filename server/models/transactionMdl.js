const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: false,
        },
        role: {
            type: String,
            required: false,
        },
        subscriptionId: {
            type: ObjectId,
            required: false,
            default: null,
        },
        commission: {
            type: Number,
            required: false,
            default: 0,
        },
        adminAmount: {
            type: Number,
            required: true,
        },
        trainerAmount: {
            type: Number,
            required: false,
            default: null,
        },
        expiry_date: {
            type: Date,
            required: false,
            default: null,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("transactions", transactionSchema);