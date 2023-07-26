const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const Levels = require("../../models/levelsMdl");
const Category = require("../../models/categoriesMdl");
const bcrypt = require("bcrypt");
require("dotenv").config();
const moment = require("moment");
const mongoose = require('mongoose');
const { USER_ROLE, TRAINER_ROLE, ADMIN_ROLE, PENDING_TRAINER } = require("../../constants/roles")

const ObjectId = mongoose.Types.ObjectId

const addWorkout = async (req, res) => {
    try {
        const { workoutTitle, description, category, difficultyLevel } = req.body
        const { trainerId } = req.query
        const thumbnailImage = req.url
        if (!trainerId && !workoutTitle && !description && !category && !difficultyLevel && !thumbnailImage)
            return res.status(400).json({ message: "All fields are required !!" });
        const newWorkout = Workout({
            trainerId,
            workoutTitle,
            description,
            category,
            difficultyLevel,
            thumbnailImage: thumbnailImage
        })
        const uploadWorkout = await newWorkout.save()
        if (!uploadWorkout)
            return res.status(400).json({ message: "Something went wrong" });
        return res.status(200).json({ message: "Workout Uploaded", workout: newWorkout });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const uploadWorkoutVideo = async (req, res) => {
    try {
        const { workoutId } = req.query
        const videos = req.url
        console.log(workoutId);
        if (!workoutId && !videos)
            return res.status(400).json({ message: "Something went wrong" });
        const uploadVideo = await Workout.findByIdAndUpdate(workoutId, { video: videos })
        if (!uploadVideo)
            return res.status(400).json({ message: "Video not uploaded! Something went wrong" });
        return res.status(200).json({ message: "Video Uploaded" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const uploadBasicWorkoutVideo = async (req, res) => {
    try {
        const { userId } = req.query
        const { basicVideo } = req.files
        if (!userId && !basicVideo)
            return res.status(400).json({ message: "Something went wrong" });
        const uploadVideo = await User.findByIdAndUpdate(userId, { basicVideo: basicVideo[0].filename }, { new: true })
        if (!uploadVideo)
            return res.status(400).json({ message: "Video not uploaded! Something went wrong" });
        return res.status(200).json({ message: "Video Uploaded", user: uploadVideo });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const workouts = async (req, res) => {
    try {
        const { userId } = req.query
        const workouts = await Workout.aggregate([
            { $match: { status: true, trainerId: new ObjectId(userId) } },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $lookup: {
                    from: "levels",
                    localField: "difficultyLevel",
                    foreignField: "_id",
                    as: "level",
                },
            },
        ]);
        if (workouts) {
            return res.status(200).json({ workouts });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const deleteWorkout = async (req, res) => {
    try {
        const { workoutId } = req.query
        if (!workoutId)
            return res.status(400).json({ message: "Invalid request" });
        const deleteWorkout = await Workout.findByIdAndUpdate(workoutId, { status: false })
        if (!deleteWorkout)
            return res.status(400).json({ message: "Workout cant be deleted" });
        return res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const editWorkout = async (req, res) => {
    try {
        const { workoutTitle, description, category, difficultyLevel } = req.body;
        const { workoutId } = req.query;
        console.log(req.body);
        if (!workoutId)
            return res.status(400).json({ message: "Invalid Workout" });
        const workoutDetails = await Workout.findById(workoutId);
        let thumbnailImage = workoutDetails.thumbnailImage
        let video = workoutDetails.video

        if (req.files && req.files.thumbnailImage) {
            thumbnailImage = req.files.thumbnailImage[0].filename
        }
        if (req.files && req.files.video) {
            video = req.files.video[0].filename
        }
        const updateResult = await Workout.findByIdAndUpdate(workoutId, {
            workoutTitle,
            description,
            category,
            difficultyLevel,
            thumbnailImage,
            video,
        }, { new: true });
        if (!updateResult)
            return res.status(400).json({ message: "Workout not updated !!" });
        return res.status(200).json({ message: "Workout updated successfully !!", workout: updateResult });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addWorkout,
    uploadWorkoutVideo,
    workouts,
    deleteWorkout,
    editWorkout,
    uploadBasicWorkoutVideo
}