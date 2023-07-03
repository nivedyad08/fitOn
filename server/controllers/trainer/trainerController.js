const User = require("../../models/usersMdl");
const userUpdate = require("../../helpers/userAccount")
const editUser = async (req, res) => {
    try {
        const details = req.body
        let images = {}
        if (req.files) {
            images = req.files
        }
        const update = await userUpdate(details, images)
        console.log(update);
        if (!update)
            return res.status(400).json({ message: "User not updated !!" });
        return res.status(200).json({ message: "User Profile updated successfully", user: user });
    } catch (error) {

    }
}


module.exports = {
    editUser
}