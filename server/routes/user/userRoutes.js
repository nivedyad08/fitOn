const express = require("express");
const userRoute = express();
const userController = require("../../controllers/user/userController");
const isUser = require("../../middlewares/isUser")


userRoute.get('/trainers', userController.trainers);
userRoute.get('/packages', userController.packages);
userRoute.post('/payment-update/:mode', userController.subscription);


module.exports = userRoute