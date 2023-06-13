const express = require("express");
const authRoute = express();
const authController = require("../controllers/authController");
const verifyUser = require("../middlewares/verifyJWT");
const userImageUpload = require("../config/multer").userImageUpload;
const userUpload = userImageUpload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
]);

authRoute.post("/user/register", authController.register);
authRoute.post("/user/profile-complete", userUpload,
    authController.profileComplete);
authRoute.post("/refresh", authController.refresh);
authRoute.post("/login", verifyUser, authController.login);
authRoute.post("/logout", authController.logout);
// authRoute.get("/getuserdata", checkIsUserAuthenticated, authController.getData);

module.exports = authRoute;
