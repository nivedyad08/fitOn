const express = require("express");
const userRoute = express();
const userController = require("../../controllers/user/userController");
const isUser = require("../../middlewares/isUser")


userRoute.get('/trainers', userController.trainers);


module.exports = userRoute