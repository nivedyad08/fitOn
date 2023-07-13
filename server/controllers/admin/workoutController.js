const Workout = require("../../models/workoutMdl");
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId

const workouts = async (req, res) => {
    try {
        const { userId } = req.query
        const workouts = await Workout.aggregate([
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
            {
                $lookup: {
                    from: "users",
                    localField: "trainerId",
                    foreignField: "_id",
                    as: "trainer",
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

/****Change Status Category*****/
const changeStatus = async (req, res) => {
    try {
        const { workoutId } = req.query
        const workout = await Workout.findById(workoutId)
        const newStatus = !workout.status
        const updateStatus = await Workout.findByIdAndUpdate(workoutId,
            { status: newStatus }
        );
        if (!updateStatus) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ message: "Status changed successfully !!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    workouts,
    changeStatus
}