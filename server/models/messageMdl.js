const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const User = require("./usersMdl");

const messageMdl = new mongoose.Schema(
    {
        sender: { type: ObjectId, ref: "User" },
        content: { type: String, trim: true },
        chat: { type: ObjectId, ref: "Chat" },
        readBy: [{ type: ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("chat", messageMdl);