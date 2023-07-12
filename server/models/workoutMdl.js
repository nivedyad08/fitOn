const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const workoutSchema = new mongoose.Schema(
    {
        trainerId: {
            type: ObjectId,
            required: true,
        },
        workoutTitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: ObjectId,
            required: true,
        },
        difficultyLevel: {
            type: ObjectId,
            required: true,
        },
        video: {
            type: String,
            required: false,
            default:null
        },
        thumbnailImage: {
            type: String,
            required: true,
        },
        totalDuration: {
            type: String,
            required: false,
            default:0
        },
        favourites: {
            type: Number,
            required: false,
            default:0
        },
        status:{
            type: Boolean,
            required: true,
            default:true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("workouts", workoutSchema);