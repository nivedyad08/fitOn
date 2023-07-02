const User = require("../../models/usersMdl");
const Category = require("../../models/categoriesMdl");
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
    const users = await User.find({ role: USER_ROLE });
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
    const trainers = await User.find({ role: { $in: [TRAINER_ROLE, PENDING_TRAINER] } });
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
    const levels = await Level.find({status:true})
    return res.status(200).json({ levels:levels });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  users,
  trainers,
  changeStatus,
  levels
}