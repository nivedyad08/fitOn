const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
        },
        trainer: {
            type: ObjectId,
            required: true,
        },
        datetime: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("sessions", sessionSchema);