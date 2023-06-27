const express = require("express");
const trainerRoute = express();
const trainerController = require("../../controllers/trainer/TrainerController");
const isTrainer   = require("../../middlewares/isTrainer")

trainerRoute.post(
    "/add-workout",
    isTrainer,
    trainerController.addWorkout
);

module.exports =  trainerRoute