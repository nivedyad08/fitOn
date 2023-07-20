const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const chatMdl = new mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [{ type: ObjectId, ref: "users" }],
        latestMessage: {
            type: ObjectId,
            ref: "messages",
        },
        groupAdmin: { type: ObjectId, ref: "users" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("chats", chatMdl);
