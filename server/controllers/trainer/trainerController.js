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
        ]);
        console.log(topWorkouts);
        return res.status(200).json({
            totalSubscribers,
            totalWorkouts,
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
