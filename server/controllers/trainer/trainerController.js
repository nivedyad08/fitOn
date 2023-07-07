const User = require("../../models/usersMdl");
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


module.exports = {
    editUser,
    changePassword
};
