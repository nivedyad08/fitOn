const express = require("express");
const adminRoute = express();
const adminController = require("../../controllers/admin/adminController");
const verifyUser = require("../../middlewares/verifyJWT");

adminRoute.get(
    "/users",
    verifyUser,
    adminController.users
);
adminRoute.get(
    "/trainers",
    verifyUser,
    adminController.trainers
);
adminRoute.put(
    "/change-user-status/:userId",
    verifyUser,
    adminController.changeStatus
  );

module.exports = adminRoute;