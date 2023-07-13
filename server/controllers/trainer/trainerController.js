const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const updateUserDetails = require("../../helpers/userAccount").updateUserDetails
const updateUserPassword = require("../../helpers/userAccount").updateUserPassword

const editUser = async (req, res) => {
    console.log(req.files);
    const userDetailsEdit = await updateUserDetails(req, res)
};

//Change Password
const changePassword = async (req, res) => {
    const updatePassword = await updateUserPassword(req, res)
};

const dashboardDetails = async (req, res) => {
    try {
        const { trainerId } = req.query
        const totalWorkouts = await Workout.find({ trainerId ,status:true}).count()
        const totalSubscriber = await User.find({ trainerId ,status:true}).count()

    } catch (error) {

    }
}


module.exports = {
    editUser,
    changePassword
};
