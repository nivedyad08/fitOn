const path = require("path");
const multer = require("multer");

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/user"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const file_extension = file.originalname.slice(
    ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );
  const array_of_allowed_files = ["png", "jpeg", "jpg", "gif"];
  const array_of_allowed_file_types = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
  ];
  if (
    array_of_allowed_files.includes(file_extension) &&
    array_of_allowed_file_types.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    req.error = "Type validation failed";
  }
};

const userImageUpload = multer({
  storage: userStorage,
  fileFilter,
  limits: { fileSize: 4000000 },
});

module.exports = {
  userImageUpload,
};
