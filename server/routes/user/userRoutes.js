const express = require("express");
const userRoute = express();
const userController = require("../../controllers/user/userController");
const transactionController = require("../../controllers/user/transactionController");
const isUser = require("../../middlewares/isUser")


userRoute.get('/trainers', userController.trainers);
userRoute.get('/packages', userController.packages);
userRoute.post('/payment-update/:mode', transactionController.subscription);
userRoute.get('/subscription', transactionController.subscriptionDetails);
userRoute.get('/favourites', userController.userFavourites);
userRoute.put('/workout/add-to-favourites', userController.addTofavourites);
userRoute.post('/workout/rating', userController.addRating);


module.exports = userRoute