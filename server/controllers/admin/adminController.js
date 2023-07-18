const User = require("../../models/usersMdl");
const Category = require("../../models/categoriesMdl");
const Workout = require("../../models/workoutMdl");
const Level = require("../../models/levelsMdl");
const bcrypt = require("bcrypt");
require("dotenv").config();
const moment = require("moment");
const { USER_ROLE, TRAINER_ROLE, ADMIN_ROLE, PENDING_TRAINER } = require("../../constants/roles")

const users = async (req, res) => {
  try {
    if (req.roles !== ADMIN_ROLE) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const users = await User.find({ role: USER_ROLE }).sort({ createdAt: -1 });
    if (users) {
      return res.status(200).json({ users });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const trainers = async (req, res) => {
  try {
    if (req.roles !== ADMIN_ROLE) {
      return res.status(400).json({ message: "Invalid user" });
    }
    // const trainers = await User.find({ role: { $in: [TRAINER_ROLE, PENDING_TRAINER] } });
    const trainers = await User.aggregate([
      { $match: { role: { $in: [TRAINER_ROLE, PENDING_TRAINER] } } },
      {
        $lookup: {
          from: "workouts",
          localField: "_id",
          foreignField: "trainerId",
          as: "workouts",
        }
      },
      { $sort: { createdAt: -1 } }
    ])
    if (trainers) {
      return res.status(200).json({ trainers });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    const newStatus = !user.isActive
    const updateStatus = await User.findByIdAndUpdate(userId,
      { isActive: newStatus, deletedAt: newStatus ? moment().format("YYYY-MM-DD") : null }
    );
    if (!updateStatus) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Status changed successfully !!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const levels = async (req, res) => {
  try {
    const levels = await Level.find({ status: true })
    return res.status(200).json({ levels: levels });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const dashboardDetails = async (req, res) => {
  try {
    const totalSubscribers = await User.find({ isSubscriber: true }).count()
    const totalUsers = await User.find({ role: USER_ROLE }).count()
    const totalTrainers = await User.find({ role: TRAINER_ROLE }).count()
    const totalWorkouts = await Workout.find({ status: true }).count()

    const topWorkouts = await Workout.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "levels",
          localField: "difficultyLevel",
          foreignField: "_id",
          as: "level",
        },
      },
      {
        $unwind: "$userRatings" // Unwind the userRatings array to separate each rating object
      },
      {
        $group: {
          _id: "$_id",
          workoutTitle: { $first: "$workoutTitle" },
          favourites: { $first: "$favourites" },
          thumbnailImage: { $first: "$thumbnailImage" },
          createdAt: { $first: "$createdAt" },
          category: { $first: "$category.name" },
          level: { $first: "$level.name" },
          totalRatingsSum: { $sum: "$userRatings.rating" }, // Calculate the sum of userRatings.rating
          totalRatingsCount: { $sum: 1 } // Count the number of ratings
        }
      },
      {
        $project: {
          workoutTitle: 1,
          thumbnailImage: 1,
          createdAt: 1,
          favourites: 1,
          totalRatingsCount: 1,
          averageRating: { $divide: ["$totalRatingsSum", "$totalRatingsCount"] }, // Calculate the average rating
          category: { $arrayElemAt: ["$category", 0] },
          level: { $arrayElemAt: ["$level", 0] }
        }
      },
      { $sort: { averageRating: -1 } },
      { $limit: 5 }
    ]);
    return res.status(200).json({
      totalSubscribers,
      totalUsers,
      totalTrainers,
      totalWorkouts,
      topWorkouts
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


module.exports = {
  users,
  trainers,
  changeStatus,
  levels,
  dashboardDetails
}