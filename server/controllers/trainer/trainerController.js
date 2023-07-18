const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const updateUserDetails = require("../../helpers/userAccount").updateUserDetails
const updateUserPassword = require("../../helpers/userAccount").updateUserPassword
const { USER_ROLE } = require("../../constants/roles")
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId

const editUser = async (req, res) => {
    const userDetailsEdit = await updateUserDetails(req, res)
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
                    workoutTitle:1,
                    thumbnailImage:1,
                    createdAt:1,
                    favourites:1,
                    totalRatingsCount:1,
                    averageRating: { $divide: ["$totalRatingsSum", "$totalRatingsCount"] }, // Calculate the average rating
                    category: { $arrayElemAt: ["$category", 0] },
                    level: { $arrayElemAt: ["$level", 0] }
                }
            }
        ]);
console.log(topWorkouts);
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


module.exports = {
    editUser,
    changePassword,
    dashboardDetails
};
