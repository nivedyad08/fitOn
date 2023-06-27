const mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const workoutSchema = new mongoose.Schema(
    {
        trainerId: {
            type: String,
            required: true,
        },
        workoutTitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            default: null,
        },
        categoryId: {
            type: String,
            required: true,
        },
        difficultyLevel: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: false,
        },
        videoName: {
            type: String,
            required: true,
        },
        thumbnailImage: {
            type: String,
            required: true,
        },
        totalDuration: {
            type: String,
            required: true,
        },
        viewers: {
            type: Number,
            required: false,
            default:0
        },
        isDeleted:{
            type: Boolean,
            required: false,
            default:false
        },
        deletedBy:{
            type: Boolean,
            required: false,
            default:false
        },
        deletedAt:{
            type: String,
            required: false,
            default:false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("workouts", workoutSchema);