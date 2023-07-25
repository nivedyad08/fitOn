require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'nivedya',
    api_key: '996299631483962',
    api_secret: 'aZAafaSo5fatuTzqTXDSylmMoP0'
});

const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'fitOn',
    },
});

module.exports = {
    imageStorage,
}
