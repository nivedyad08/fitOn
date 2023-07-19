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
const accessChat = async (req, res) => {
    if (req.user) {

        const { userId } = req.body;

        if (!userId) {
            console.log("UserId param not sent with request");
            return res.sendStatus(400);
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "firstName image email",
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };

            try {
                const createdChat = await Chat.create(chatData);
                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                    "users",
                    "-password"
                );
                res.status(200).json(FullChat);
            } catch (error) {
                res.status(400);
                throw new Error(error.message);
            }
        }
    }
};

const fetchChats = async (req, res) => {
    try {
        if (req.user) {

            Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 })
                .then(async (results) => {
                    results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "fisrtName image email",
                    });
                    res.status(200).send(results);
                });
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

const AllMessage = async (req, res) => {

    if (req.user) {
        try {
            const messages = await Message.find({ chat: req.query.chatId })
                .populate("sender", "firstName image email")
                .populate("chat");
            res.json({ messages: messages });
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
};

const SendMessage = async (req, res) => {
    try {
        if (req.user) {
            const { content, chatId } = req.body;

            if (!content || !chatId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }

            var newMessage = {
                sender: req.user._id,
                content: content,
                chat: chatId,
            };


            var message = await Message.create(newMessage);

            message = await message.populate("sender", "firstName image")
            message = await message.populate("chat")
            message = await User.populate(message, {
                path: "chat.users",
                select: "firstName image email",
            });

            await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

            res.json(message);

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

module.exports = {
    trainers,
    packages,
    addTofavourites,
    userFavourites,
    addRating,
    accessChat
};