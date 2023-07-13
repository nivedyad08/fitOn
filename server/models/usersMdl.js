const mongoose = require("mongoose");
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    isActive: {
      type: Boolean,
      required: false,
      default: null,
    },
    role: {
      type: String,
      required: true,
      default: null,
    },
    profilePic: {
      type: String,
      required: false,
      default: null,
    },
    coverPhoto: {
      type: String,
      required: false,
      default: null,
    },
    userBio: {
      type: String,
      required: false,
      default: null,
    },
    userLocation: {
      type: String,
      required: false,
      default: null,
    },
    basicVideo: {
      type: String,
      required: false,
      default: null
    },
    deletedAt: {
      type: String,
      required: false,
      default: null,
    },
    verificationCode: {
      type: String,
      required: false,
      default: null,
    },
    lastPasswordResetDate: {
      type: String,
      required: false,
      default: null,
    },
    userFavourites: [
      {
        workoutId: { type: ObjectId },
        trainerId: { type: ObjectId },
        createdAt: { type: String },
      },
    ],
    subscriptions: [
      {
        trainerId: { type: ObjectId },
        subscriptionId: { type: ObjectId },
        startDate: { type: Date },
        endDate: { type: Date },
        isValid:{ type: Boolean },
      },
    ],
    isSubscriber: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

// Set the rest of the fields as null
userSchema.set("toObject", { getters: true });
userSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("users", userSchema);
