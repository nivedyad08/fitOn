const express = require("express");
const authRoute = express();
const authController = require("../controllers/authController");
const userImageUpload = require("../config/multer").userImageUpload;
const userUpload = userImageUpload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
]);

authRoute.post("/user/register", authController.register);
authRoute.post("/user/validate-otp", authController.validateOtp);
authRoute.post("/user/profile-complete", userUpload,
    authController.profileComplete);
authRoute.post("/user/payment-update/:userId",
    authController.paymentUpdate);
authRoute.post("/refresh", authController.refresh);
authRoute.post("/user/login", authController.login);
authRoute.post("/logout", authController.logout);
authRoute.post("/forgot-password", authController.forgotPassword);
authRoute.post('/update/password', authController.updatePassword)
authRoute.get('/popular/workouts', authController.popularWorkouts);
authRoute.get('/trainers', authController.trainers);

module.exports = authRoute;
