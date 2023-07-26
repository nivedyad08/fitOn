const express = require("express");
const trainerRoute = express();
const workoutController = require("../../controllers/trainer/workoutController");
const trainerController = require("../../controllers/trainer/trainerController");
const isTrainer = require("../../middlewares/isTrainer")
const upload = require("../../config/multer").workoutVideoUpload
const workoutUpload = require("../../config/multer").workoutVideoUpload
const thumbnailUpload = require("../../config/multer").userImageUpload;

const { cloudinary } = require("../../utils/cloudinary")
const uploadImageToCloudinary = require("../../utils/uploadToCloudinary").uploadImageToCloudinary
const uploadVideoToCloudinary = require("../../utils/uploadToCloudinary").uploadVideoToCloudinary

const userImageUpload = require("../../config/multer").userImageUpload;
const userUpload = userImageUpload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
]);


trainerRoute.get('/workouts', isTrainer, workoutController.workouts);

//Add Workout
trainerRoute.post('/add-workout', isTrainer, thumbnailUpload.single('thumbnailImage'), uploadImageToCloudinary, workoutController.addWorkout);

trainerRoute.post('/upload-workout-video', isTrainer, workoutUpload.fields([
  {
    name: "videos",
    maxCount: 1,
  },
]), uploadVideoToCloudinary, workoutController.uploadWorkoutVideo);


trainerRoute.put('/delete-workout', isTrainer, workoutController.deleteWorkout);
trainerRoute.post('/edit-workout', isTrainer, workoutController.editWorkout);
trainerRoute.post('/upload-basic-workout-video', isTrainer, workoutUpload.fields([
  {
    name: "basicVideo",
    maxCount: 1,
  },
]), workoutController.uploadBasicWorkoutVideo);

trainerRoute.post('/edit-user-details', isTrainer, userUpload, uploadImageToCloudinary, trainerController.editUser);
trainerRoute.post('/change/password', isTrainer, trainerController.changePassword);
trainerRoute.get('/dashboard/details', isTrainer, trainerController.dashboardDetails);
trainerRoute.get('/subscribedUsers', isTrainer, trainerController.subscribedUsers);
trainerRoute.post('/create/session', isTrainer, trainerController.createSession);
trainerRoute.get('/sessions', trainerController.sessions);
trainerRoute.get('/change/session-status', isTrainer, trainerController.changeSession);

module.exports = trainerRoute