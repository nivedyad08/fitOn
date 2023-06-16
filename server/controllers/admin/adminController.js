const User = require("../../models/usersMdl");
const bcrypt = require("bcrypt");
require("dotenv").config();
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
        const trainers = await User.find({ role: TRAINER_ROLE });
        if (trainers) {
            return res.status(200).json({ trainers });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
      if (!req.params.userId) {
        return res.status(400).json({ message: "Invalid entry" });
      }
      const userDelete = User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { isActive: false,deletedAt:moment().format("YYYY-MM-DD"), } }
      );
      if (!userDelete) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      return res.status(200).json({ message: "User deleted successfully !!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {
    users,
    trainers,
    deleteUser
}