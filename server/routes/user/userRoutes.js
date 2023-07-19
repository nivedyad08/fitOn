const express = require("express");
const userRoute = express();
const userController = require("../../controllers/user/userController");
const transactionController = require("../../controllers/user/transactionController");
const isUser = require("../../middlewares/isUser")


userRoute.get('/trainers', isUser, userController.trainers);
userRoute.get('/packages', isUser, userController.packages);
userRoute.post('/payment-update/:mode', isUser, transactionController.subscription);
userRoute.get('/subscription', isUser, transactionController.subscriptionDetails);
userRoute.get('/favourites', isUser, userController.userFavourites);
userRoute.put('/workout/add-to-favourites', isUser, userController.addTofavourites);
userRoute.post('/workout/rating', isUser, userController.addRating)

module.exports = userRoute