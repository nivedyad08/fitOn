const User = require("../models/usersMdl");
const bcrypt = require("bcrypt");
const moment = require("moment");

const updateUserDetails = async (req, res) => {
    try {
        const { firstName, lastName, userBio, userLocation } = req.body;
        const { userId } = req.query;
        const userDetails = await User.findById(userId);
        if (!userId) {
            return res.status(400).json({ message: "Invalid User" });
        }
        let profilePic = userDetails.profilePic
        let coverPhoto = userDetails.coverPhoto

        if (req.files && req.files.profilePic) {
            profilePic = req.files.profilePic[0].path
        }
        if (req.files && req.files.coverPhoto) {
            coverPhoto = req.files.coverPhoto[0].path
        }
        const updateResult = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            userBio,
            userLocation,
            profilePic,
            coverPhoto,
        });
        const userInfo = await User.findById(userId);
        console.log(userInfo);
        return { user: updateResult };
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

//Change Password
const updateUserPassword = async (req, res) => {
    const { newPassword, confirmPassword, currentPassword } = req.body;
    const { userId } = req.query;

    try {
        if (!newPassword || !confirmPassword || !currentPassword) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "Invalid User" });
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Current password doesn't match" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password do not match" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, {
            password: hashedPassword,
            lastPasswordResetDate: moment().format("YYYY-MM-DD")
        });

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    updateUserDetails,
    updateUserPassword
}