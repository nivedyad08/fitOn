const express = require("express");
const adminRoute = express();
const adminController = require("../../controllers/admin/adminController");
const isAdmin   = require("../../middlewares/isAdmin")

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

module.exports = adminRoute;