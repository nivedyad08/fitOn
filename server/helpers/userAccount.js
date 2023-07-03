const User = require("../models/usersMdl");

const updateUser = async (details, images) => {
    try {
        const { firstName, lastName, userBio, userLocation, userId, profileImage ,coverImage} = details
        const user = await User.findById(userId)
        if (!user)
            return res.status(400).json({ message: "Invalid user" });
        if (images !== null) {
            let { profilePic, coverPhoto } = images
            const profileImage = profilePic[0].filename;
            const coverImage = coverPhoto[0].filename;
        }
        const update = User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            userBio,
            userLocation,
            profilePic: profileImage,
            coverPhoto: coverImage
        },{new:true})
        if (!update)
            return res.status(400).json({ message: "Profile not updated" });
        return res.status(200).json({ user: update});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}