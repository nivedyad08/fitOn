const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const Level = require("../../models/levelsMdl");
const Package = require("../../models/packageMdl");
const { TRAINER_ROLE } = require("../../constants/roles")

const trainers = async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId)
            return res.status(400).json({ message: "Something went wrong" });
        const user = await User.findById(userId)
        if (!user)
            return res.status(400).json({ message: "Invalid user" });

        const level = await Level.findOne({ name: "Beginner" }, { _id: 1 })
        // const levelMatch = !user.isSubscriber ? { difficultyLevel: level._id } : {}
        const limitCount = !user.isSubscriber ? 10 : null
        let trainersList = ""
        trainersList = await User.aggregate([
            { $match: { isActive: true, role: TRAINER_ROLE } },
            {
                $lookup: {
                    from: "workouts",
                    localField: "_id",
                    foreignField: "trainerId",
                    as: "workouts",
                }
            },
            { $sort: { createdAt: 1 } }
        ])
        // if (user.isSubscriber) {
        //     trainersList = await User.aggregate([
        //         { $match: { isActive: true, role: TRAINER_ROLE } },
        //         {
        //             $lookup: {
        //                 from: "workouts",
        //                 localField: "_id",
        //                 foreignField: "trainerId",
        //                 as: "workouts",
        //             }
        //         },
        //         { $sort: { createdAt: 1 } }
        //     ])
        // } else {
        //     trainersList = await Workout.aggregate([
        //         { $match: { status: true, difficultyLevel: level._id } },
        //         {
        //             $lookup: {
        //                 from: "users",
        //                 localField: "trainerId",
        //                 foreignField: "_id",
        //                 as: "users",
        //             }
        //         },
        //         {
        //             $project: {
        //                 workoutTitle: 1,
        //                 description: 1,
        //                 video: 1,
        //                 thumbnailImage: 1,
        //                 totalDuration: 1,
        //                 viewers: 1,
        //                 createdAt: 1,
        //                 user: { $arrayElemAt: ["$users", 0] }
        //             }
        //         },
        //         { $limit: 10 }, { $sort: { createdAt: 1 } }
        //     ])
        // }
        return res.status(200).json({ trainers: trainersList });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const packages = async (req, res) => {
    const packages = await Package.find({ status: true })
    if (packages)
        return res.status(200).json({ packages: packages });
    return res.status(400).json({ message: error.message });
}




module.exports = {
    trainers,
    packages,
};