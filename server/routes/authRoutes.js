const express = require("express");
const authRoute = express();
const authController = require("../controllers/authController");
const checkIsUserAuthenticated = require("../middlewares/authMiddleware");
const userImageUpload = require("../config/multer").userImageUpload;

authRoute.post("/user/register",userImageUpload.single("profilePic"), authController.register);
// authRoute.post("/user/login", authController.login);
// authRoute.get("/getuserdata", checkIsUserAuthenticated, authController.getData);

module.exports = authRoute;
