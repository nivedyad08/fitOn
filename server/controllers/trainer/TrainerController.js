const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const Levels = require("../../models/levelsMdl");
const Category = require("../../models/categoriesMdl");
const bcrypt = require("bcrypt");
require("dotenv").config();
const moment = require("moment");
const { USER_ROLE, TRAINER_ROLE, ADMIN_ROLE, PENDING_TRAINER } = require("../../constants/roles")


const addWorkout = async (req, res) => {
    try {
        const { trainerId, workoutTitle, description, categoryId, difficultyLevel } = req.body
        const { thumbnailImage } = req.files
        if (!trainerId && !workoutTitle && !description && !categoryId && !difficultyLevel && !thumbnailImage)
            return res.status(400).json({ message: "All fields are required !!" });

    } catch (error) {

    }
}














module.exports = {
    addWorkout,
}