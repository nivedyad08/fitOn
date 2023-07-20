const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const messageMdl = new mongoose.Schema(
    {
        sender: { type: ObjectId, ref: "users" },
        content: { type: String, trim: true },
        chat: { type: ObjectId, ref: "chats" },
        readBy: [{ type: ObjectId, ref: "users" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("messages", messageMdl);