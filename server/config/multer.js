const path = require("path");
const multer = require("multer");

const userImageUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
      cb(new Error('File does not support'), false);
      return;
    }
    cb(null, true);
  }
});

const workoutVideoUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const file_extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    const array_of_allowed_files = ["mp4", "mpeg", "mov", "gif"]; // Remove the dot before "mov"
    const array_of_allowed_file_types = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "image/gif"
    ];
    if (
      array_of_allowed_files.includes(file_extension) &&
      array_of_allowed_file_types.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error('Type validation failed'), false);
      req.error = "Type validation failed";
    }
  }
});


module.exports = {
  userImageUpload,
  workoutVideoUpload,
};
