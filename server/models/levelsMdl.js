const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const difficultyLevelSchema = new mongoose.Schema(
    {
        levelText: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("levels", difficultyLevelSchema);