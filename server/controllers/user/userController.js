const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const Level = require("../../models/levelsMdl");
const Package = require("../../models/packageMdl");
const { TRAINER_ROLE } = require("../../constants/roles")
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId

const trainers = async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId)
            return res.status(400).json({ message: "Something went wrong" });
        const user = await User.findById(userId)
        if (!user)
            return res.status(400).json({ message: "Invalid user" });

        const level = await Level.findOne({ name: "Beginner" }, { _id: 1 })
        let trainersList = ""

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

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
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ])
        const totalTrainersCount = await User.find({ role: TRAINER_ROLE }).count()
        return res.status(200).json({ trainers: trainersList, totalTrainersCount: totalTrainersCount });
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

const addTofavourites = async (req, res) => {
    try {
        const { workoutId, userId } = req.query;
        const user = await User.findById(userId)
        const workout = await Workout.findById(workoutId)
        if (!user || !workout)
            return res.status(400).json({ message: "Invalid request" });

        const favWorkout = await User.find({
            _id: userId,
            userFavourites: { $elemMatch: { workoutId } }
        }).count()

        if (!favWorkout) {
            const createdDate = new Date()
            const userFavouritesDetails = {
                workoutId: workoutId,
                trainerId: workout.trainerId,
                createdAt: createdDate.toISOString(),
            }
            const addTofavs = await User.findByIdAndUpdate(
                userId,
                { $push: { userFavourites: userFavouritesDetails } },
                { new: true }
            );
            const updateFavouriteCount = await Workout.findByIdAndUpdate(workoutId, { $inc: { favourites: 1 } })
            return res.status(200).json({ message: "Added to favourites", isValid: true, user: addTofavs });
        } else {
            const removeFromofavs = await User.findByIdAndUpdate(
                userId,
                { $pull: { userFavourites: { workoutId: workoutId } } },
                { new: true }
            );
            if (workout.favourites) {
                const updateFavouriteCount = await Workout.findByIdAndUpdate(workoutId, { $inc: { favourites: -1 } })
            }
            return res.status(200).json({ message: "Removed from favourites", isValid: false, user: removeFromofavs });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const userFavourites = async (req, res) => {
    try {
        const { userId } = req.query
        const favourites = await User.aggregate([
            { $match: { _id: new ObjectId(userId) } },
            { $unwind: "$userFavourites" },
            { $project: { userFavourites: 1 } },
            {
                $lookup: {
                    from: "workouts",
                    localField: "userFavourites.workoutId",
                    foreignField: "_id",
                    as: "workout",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userFavourites.trainerId",
                    foreignField: "_id",
                    as: "trainer",
                },
            },
            {
                $project: {
                    "userFavourites.createdAt": 1,
                    "userFavourites.trainerId": 1,
                    "userFavourites.workoutId": 1,
                    "workout.workoutTitle": { $arrayElemAt: ["$workout.workoutTitle", 0] },
                    "workout.workoutId": { $arrayElemAt: ["$workout._id", 0] },
                    "workout.video": { $arrayElemAt: ["$workout.video", 0] },
                    "workout.thumbnailImage": { $arrayElemAt: ["$workout.thumbnailImage", 0] },
                    "trainer.firstName": { $arrayElemAt: ["$trainer.firstName", 0] },
                    "trainer.lastName": { $arrayElemAt: ["$trainer.lastName", 0] },
                },
            },
            { $sort: { createdAt: 1 } },
        ])
        if (!favourites)
            return res.status(400).json({ message: "Something went wrong" });
        return res.status(200).json({ favourites: favourites });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const addRating = async (req, res) => {
    try {
        const { userId } = req.query;
        const { workoutId, trainerId, rating } = req.body;
        const user = await User.findById(userId)
        const workout = await Workout.findById(workoutId)
        if (!user || !workout)
            return res.status(400).json({ message: "Invalid request" });

        const rateWorkout = await Workout.find({
            _id: workoutId,
            userRatings: { $elemMatch: { userId } }
        }).count()

        const userRatingDetails = {
            userId,
            rating,
            createdAt: new Date().toISOString(),
        }
        if (!rateWorkout) {
            const addRatings = await Workout.findByIdAndUpdate(
                workoutId,
                { $push: { userRatings: userRatingDetails } },
                { new: true }
            );
        } else {
            const updateRating = await Workout.updateOne(
                {
                    _id: workoutId,
                    userRatings: { $elemMatch: { userId } }
                },
                { $set: { "userRatings.$.rating": userRatingDetails.rating } },
                { new: true }
            );
        }
        const updatedUserDetails = await User.aggregate([
            { $match: { _id: new ObjectId(trainerId) } },
            {
                $lookup: {
                    from: "workouts",
                    localField: "_id",
                    foreignField: "trainerId",
                    as: "workouts",
                }
            }])
        return res.status(200).json({ message: "Updated Rating", isValid: true, workout: updatedUserDetails });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const searchTrainer = async (req, res, next) => {
    try {
        const { search } = req.body;
        const showTrainer = await User.aggregate([
            {
                $match: {
                    isActive: true,
                    firstName: { $regex: `${ search }.*`, $options: "i" },
                },
            },
        ]);
        console.log(showTrainer);
        return res.status(200).json({ showTrainer: showTrainer });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    trainers,
    packages,
    addTofavourites,
    userFavourites,
    addRating,
    searchTrainer
};