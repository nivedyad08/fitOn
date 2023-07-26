const cloudinary = require('cloudinary').v2;

const uploadImageToCloudinary = async (req, res, next) => {
    try {
        if (req.file) {
            const image = await cloudinary.uploader.upload(req.file.path);
            req.url = image.url;
        } else if (req.files && req.files.coverPhoto) {
            const coverPhoto = await cloudinary.uploader.upload(req.files.coverPhoto[0].path);
            req.coverPhoto = coverPhoto.url;
        }
        else if (req.files && req.files.profilePic) {
            const profilePic = await cloudinary.uploader.upload(req.files.profilePic[0].path);
            req.profilePic = profilePic.url;
        }
        next();
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        res.status(500).json({ message: "Error uploading image" });
    }
};

const uploadVideoToCloudinary = async (req, res, next) => {
    try {
        const video = await cloudinary.uploader.upload(req.files.videos[0].path, { resource_type: 'video' });
        req.url = video.url
        next();
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        res.status(500).json({ message: error });
    }
};

module.exports = {
    uploadImageToCloudinary,
    uploadVideoToCloudinary
}
