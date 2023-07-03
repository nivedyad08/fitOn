const express = require("express");
const adminRoute = express();
const adminController = require("../../controllers/admin/adminController");
const categoryController = require("../../controllers/admin/categoryController");
const workoutController = require("../../controllers/admin/workoutController");
const isAdmin = require("../../middlewares/isAdmin")

adminRoute.get(
    "/users",
    isAdmin,
    adminController.users
);
adminRoute.get(
    "/trainers",
    isAdmin,
    adminController.trainers
);
adminRoute.put(
    "/change-user-status/:userId",
    isAdmin,
    adminController.changeStatus
);
adminRoute.get("/categories", isAdmin, categoryController.categories)
adminRoute.post("/add-category", isAdmin, categoryController.addCategory)
adminRoute.post("/update-category", isAdmin, categoryController.updateCategory)
adminRoute.put("/category/change-status", isAdmin, categoryController.changeStatus)

adminRoute.get("/levels", isAdmin, adminController.levels)
adminRoute.get("/workouts", isAdmin, workoutController.workouts)
adminRoute.put("/workout/change-status", isAdmin, workoutController.changeStatus)

module.exports = adminRoute;