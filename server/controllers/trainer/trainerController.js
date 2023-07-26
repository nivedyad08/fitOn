const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const Sessions = require("../../models/sessionsMdls");
const updateUserDetails = require("../../helpers/userAccount").updateUserDetails
const updateUserPassword = require("../../helpers/userAccount").updateUserPassword
const { USER_ROLE, TRAINER_ROLE } = require("../../constants/roles")
const mongoose = require('mongoose');
const moment = require('moment');

const ObjectId = mongoose.Types.ObjectId

const editUser = async (req, res) => {
    try {
        console.log(889889);
        const { firstName, lastName, userBio, userLocation } = req.body;
        const { userId } = req.query;
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(400).json({ message: "Invalid User" });
        }

        // Keep track of whether profilePic and coverPhoto have been updated
        let profilePicUpdated = false;
        let coverPhotoUpdated = false;

        if (req.profilePic) {
            userDetails.profilePic = req.profilePic;
            profilePicUpdated = true;
        }
        if (req.coverPhoto) {
            userDetails.coverPhoto = req.coverPhoto;
            coverPhotoUpdated = true;
        }

        // Update other user details
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        userDetails.userBio = userBio;
        userDetails.userLocation = userLocation;

        // Save the updated user details
        const updatedUser = await userDetails.save();

        return res.status(200).json({ user: updatedUser, profilePicUpdated, coverPhotoUpdated });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};



//Change Password
const changePassword = async (req, res) => {
    const updatePassword = await updateUserPassword(req, res)
};

const dashboardDetails = async (req, res) => {
    try {
        const { trainerId } = req.query
        const totalWorkouts = await Workout.find({ trainerId, status: true }).count()

        const totalFavs = await Workout.aggregate([
            {
                $match: { trainerId: new ObjectId(trainerId) }
            },
            {
                $group: {
                    _id: null,
                    totalFavouritesSum: { $sum: "$favourites" } // Calculate the sum of 'favourites'
                }
            }
        ]);
        const totalFavourites = totalFavs[0].totalFavouritesSum

        const totalSubscribers = await User.find({
            role: USER_ROLE,
            subscriptions: { $elemMatch: { trainerId, isValid: true } }
        }).count()


        const topWorkouts = await Workout.aggregate([
            { $match: { status: true, trainerId: new ObjectId(trainerId) } },
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
                $unwind: "$userRatings" // Unwind the userRatings array to separate each rating object
            },
            {
                $group: {
                    _id: "$_id",
                    workoutTitle: { $first: "$workoutTitle" },
                    favourites: { $first: "$favourites" },
                    thumbnailImage: { $first: "$thumbnailImage" },
                    createdAt: { $first: "$createdAt" },
                    category: { $first: "$category.name" },
                    level: { $first: "$level.name" },
                    totalRatingsSum: { $sum: "$userRatings.rating" }, // Calculate the sum of userRatings.rating
                    totalRatingsCount: { $sum: 1 } // Count the number of ratings
                }
            },
            {
                $project: {
                    workoutTitle: 1,
                    thumbnailImage: 1,
                    createdAt: 1,
                    favourites: 1,
                    totalRatingsCount: 1,
                    averageRating: { $divide: ["$totalRatingsSum", "$totalRatingsCount"] }, // Calculate the average rating
                    category: { $arrayElemAt: ["$category", 0] },
                    level: { $arrayElemAt: ["$level", 0] }
                }
            }
        ]);
        return res.status(200).json({
            totalSubscribers,
            totalWorkouts,
            totalFavourites,
            topWorkouts
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const subscribedUsers = async (req, res) => {
    try {
        const { trainerId } = req.query
        const userId = new mongoose.Types.ObjectId(trainerId);
        const usersList = await User.aggregate([
            {
                $match: {
                    subscriptions: { $elemMatch: { trainerId: userId } }
                }
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                }
            }
        ]);
        console.log(usersList);
        return res.status(200).json({ usersList });
    } catch (error) {

    }
}

const createSession = async (req, res) => {
    try {
        const { user, datetime, status } = req.body.data
        const { trainerId } = req.query
        const userDetails = await User.findById(user)
        if (!user && !datetime && !status && trainerId)
            return res.status(400).json({ message: "All fields are required" });
        const newSession = Sessions({
            user,
            trainer: trainerId,
            datetime,
            status,
        });
        const resSession = await newSession.save();
        if (!resSession)
            return res.status(400).json({ message: "Something went wrong" });

        return res.status(200).json({ status: 200, session: resSession, userDetails });
    } catch (error) {

    }
}

const sessions = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId);

        let matchCondition;
        if (user.role === TRAINER_ROLE) {
            matchCondition = { trainer: new ObjectId(userId) };
        } else {
            matchCondition = { user: new ObjectId(userId) };
        }

        const sessionsList = await Sessions.aggregate([
            {
                $match: matchCondition
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "trainer",
                    foreignField: "_id",
                    as: "trainer",
                }
            },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    datetime: 1,
                    user: {
                        $concat: [
                            { $arrayElemAt: ["$user.firstName", 0] },
                            " ",
                            { $arrayElemAt: ["$user.lastName", 0] },
                        ]
                    },
                    userProfilePic: { $arrayElemAt: ["$user.profilePic", 0] },
                    trainer: {
                        $concat: [
                            { $arrayElemAt: ["$trainer.firstName", 0] },
                            " ",
                            { $arrayElemAt: ["$trainer.lastName", 0] },
                        ]
                    },
                }
            },
            { $sort: { createdAt: 1 } },
        ]);

        // Format the datetime field using moment
        sessionsList.forEach(session => {
            session.datetime = moment(session.datetime).format("YYYY-MM-DD HH:mm A");
        });

        return res.status(200).json({ sessionsList });
    } catch (error) {
        // Handle the error here
        console.error(error);
        return res.status(500).json({ error: "An error occurred" });
    }
}

const changeSession = async (req, res) => {
    try {
        const { sessionId } = req.query
        const { status } = req.body
        const updateStatus = await Sessions.findByIdAndUpdate(sessionId,
            { status: status }
        );
        if (!updateStatus) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ status: 200, message: "Status changed successfully !!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    editUser,
    changePassword,
    dashboardDetails,
    subscribedUsers,
    createSession,
    sessions,
    changeSession
};
