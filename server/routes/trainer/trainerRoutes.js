const express = require("express");
const trainerRoute = express();
const workoutController = require("../../controllers/trainer/workoutController");
const isTrainer = require("../../middlewares/isTrainer")
const upload = require("../../config/multer").workoutVideoUpload
const workoutUpload = require("../../config/multer").workoutVideoUpload
const thumbnailUpload = require("../../config/multer").userImageUpload;

trainerRoute.get('/workouts', isTrainer, workoutController.workouts);

trainerRoute.post('/add-workout', isTrainer, thumbnailUpload.single('thumbnailImage'), workoutController.addWorkout);

trainerRoute.post('/upload-workout-video', isTrainer,  workoutUpload.fields([
  {
    name: "videos",
    maxCount: 5,
  },
]), workoutController.uploadWorkoutVideo);

module.exports = trainerRoute