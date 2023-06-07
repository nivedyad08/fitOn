const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    role: {
      type: Boolean,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    coverPhoto: {
      type: String,
      required: false,
    },
    userBio: {
      type: String,
      required: false,
    },
    userLocation: {
      type: String,
      required: false,
    },
    deletedAt: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
    },
    lastPasswordResetDate: {
      type: String,
      required: true,
    },
    userFavourites: {
      type: Array,
      required: true,
    },
    userFavourites: [
      {
        id: { type: ObjectId },
        workout_id: { type: Number },
        trainer_id: { type: Number },
        createdAt: { type: String },
        updatedAt: { type: String },
      },
    ],
    subscriptions: [
      {
        subscription_id: { type: ObjectId },
        trainer_id: { type: Number },
        start_date: { type: Number },
        end_date: { type: Number },
        isValid: { type: Boolean },
        package_id: { type: Boolean },
        total_amount: { type: Number },
        createdAt: { type: String },
        updatedAt: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
