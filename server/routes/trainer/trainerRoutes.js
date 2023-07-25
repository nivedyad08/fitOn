const express = require("express");
const multer = require("multer");
const trainerRoute = express();
const workoutController = require("../../controllers/trainer/workoutController");
const trainerController = require("../../controllers/trainer/trainerController");
const isTrainer = require("../../middlewares/isTrainer")
// const upload = require("../../config/multer").workoutVideoUpload
const workoutUpload = require("../../config/multer").workoutVideoUpload


// const userUpload = multer({ storage: imgUpload }).fields([
//   { name: "profilePic", maxCount: 1 },
//   { name: "coverPhoto", maxCount: 1 },
// ]);

const storage = require("../../utils/cloudinary").imageStorage
const upload = multer({ storage })


// const thumbnailUpload = require("../../config/multer").userImageUpload;

// const userImageUpload = require("../../config/multer").userImageUpload;


trainerRoute.get('/workouts', isTrainer, workoutController.workouts);

trainerRoute.post('/add-workout', isTrainer, upload.single("thumbnailImage"), workoutController.addWorkout);

trainerRoute.post('/upload-workout-video', isTrainer, workoutUpload.fields([
  {
    name: "videos",
    maxCount: 1,
  },
]), workoutController.uploadWorkoutVideo);

trainerRoute.put('/delete-workout', isTrainer, workoutController.deleteWorkout);
trainerRoute.post('/edit-workout', isTrainer, workoutController.editWorkout);
trainerRoute.post('/upload-basic-workout-video', isTrainer, workoutUpload.fields([
  {
    name: "basicVideo",
    maxCount: 1,
  },
]), workoutController.uploadBasicWorkoutVideo);

trainerRoute.post('/edit-user-details', isTrainer, trainerController.editUser);
trainerRoute.post('/change/password', isTrainer, trainerController.changePassword);
trainerRoute.get('/dashboard/details', isTrainer, trainerController.dashboardDetails);
trainerRoute.get('/subscribedUsers', isTrainer, trainerController.subscribedUsers);
trainerRoute.post('/create/session', isTrainer, trainerController.createSession);
trainerRoute.get('/sessions', trainerController.sessions);
trainerRoute.get('/change/session-status', isTrainer, trainerController.changeSession);


module.exports = trainerRoute