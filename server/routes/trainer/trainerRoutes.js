const express = require("express");
const trainerRoute = express();
const workoutController = require("../../controllers/trainer/workoutController");
const trainerController = require("../../controllers/trainer/trainerController");
const isTrainer = require("../../middlewares/isTrainer")
const upload = require("../../config/multer").workoutVideoUpload
const workoutUpload = require("../../config/multer").workoutVideoUpload
const thumbnailUpload = require("../../config/multer").userImageUpload;

const userImageUpload = require("../../config/multer").userImageUpload;
const userUpload = userImageUpload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
]);

trainerRoute.get('/workouts', isTrainer, workoutController.workouts);

trainerRoute.post('/add-workout', isTrainer, thumbnailUpload.single('thumbnailImage'), workoutController.addWorkout);

trainerRoute.post('/upload-workout-video', isTrainer,  workoutUpload.fields([
  {
    name: "videos",
    maxCount: 5,
  },
]), workoutController.uploadWorkoutVideo);

trainerRoute.put('/delete-workout', isTrainer, workoutController.deleteWorkout);
trainerRoute.post('/edit-workout', isTrainer, workoutController.editWorkout);

trainerRoute.post('/edit-user-details', isTrainer, trainerController.editUser);


module.exports = trainerRoute