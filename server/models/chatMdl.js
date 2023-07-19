const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const User = require("./usersMdl");

const chatMdl = new mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{ type: ObjectId, ref: "User" }],
        latestMessage: {
            type: ObjectId,
            ref: "Message",
        },
        groupAdmin: { type: ObjectId, ref: "User" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("chat", chatMdl);
