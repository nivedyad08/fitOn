const User = require("../../models/usersMdl");
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

const deleteUsers = async (req, res) => {
  try {
    console.log(67890);
    const userEmails = req.body
    const usersDelete = await User.updateMany(
      { email: { $in: userEmails } },
      { $set: { isActive: false, deletedAt: moment().format("YYYY-MM-DD") } }
    );
    if (!usersDelete) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "User deleted successfully !!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  users,
  trainers,
  deleteUsers
}