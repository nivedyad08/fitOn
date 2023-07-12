const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const subscriptionSchema = new mongoose.Schema(
    {
        paymentId: {
            type: String,
            required: true,
        },
        userId: {
            type: ObjectId,
            required: true,
        },
        trainerId: {
            type: ObjectId,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        packageId: {
            type: ObjectId,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        gst: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("subscriptions", subscriptionSchema);