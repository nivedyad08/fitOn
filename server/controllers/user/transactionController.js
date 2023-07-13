const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const Level = require("../../models/levelsMdl");
const Package = require("../../models/packageMdl");
const Subscription = require("../../models/subscriptionMdl");
const Transaction = require("../../models/transactionMdl");
const { TRAINER_ROLE, USER_ROLE } = require("../../constants/roles")
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId

const subscription = async (req, res) => {
    try {
        const { address, package, phone } = req.body.formdata
        const { transactionId } = req.body
        const { userId, trainerId } = req.query
        if (!address && !package && !phone && !userId)
            return res.status(400).json({ message: "All fields are required" });
        const user = await User.findById(userId)
        if (!user)
            return res.status(400).json({ message: "Invalid user" });
        const packageDetails = await Package.findOne({ name: package })
        const gstAmt = ((packageDetails.gst * packageDetails.price) / 100).toFixed(2)
        const totalAmt = (parseFloat(gstAmt) + parseFloat(packageDetails.price)).toFixed(2);

        const currentDate = new Date();
        let endDate = null;

        if (packageDetails.duration === "6") {
            endDate = new Date(currentDate.setMonth(currentDate.getMonth() + 5));
        } else if (packageDetails.duration === "12") {
            endDate = new Date(currentDate);
            endDate.setFullYear(currentDate.getFullYear() + 1);
        }

        const startDate = new Date()
        const newSubscriber = Subscription({
            paymentId: transactionId,
            userId,
            trainerId,
            address,
            phone,
            packageId: packageDetails._id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            gst: packageDetails.gst,
            totalAmount: totalAmt,
        });
        const resSubscribe = await newSubscriber.save();

        //Calculate the distributed amount
        const adminPercentage = 5
        const trainerPercentage = 100 - adminPercentage
        const adminAmt = (totalAmt * adminPercentage) / 100
        const trainerAmt = (totalAmt * trainerPercentage) / 100

        const newTransaction = Transaction({
            userId,
            role: user.role,
            subscriptionId: resSubscribe._id,
            commission: 5,
            adminAmount: adminAmt.toFixed(2),
            trainerAmount: trainerAmt.toFixed(2),
            expiry_date: endDate
        })
        if (resSubscribe) {
            const resTransaction = await newTransaction.save();
            if (resTransaction) {
                //update user
                try {
                    const subscriptionDetails = {
                        trainerId: trainerId,
                        subscriptionId: resSubscribe._id,
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                        isValid: true
                    }
                    const updateUser = await User.findByIdAndUpdate(
                        userId,
                        { $push: { subscriptions: subscriptionDetails }, isSubscriber: true },
                        { new: true }
                    );
                    return res.status(200).json({ message: "Payment successful", user: updateUser });
                } catch (error) {
                    console.error('Error updating user:', error);
                }
            }
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const subscriptionDetails = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId);

        let matchStage = {};
        let localField = "";
        let foreignField = "";

        if (user.role === USER_ROLE) {
            matchStage = { userId: new ObjectId(userId) };
            localField = "trainerId";
            foreignField = "_id";
        } else {
            matchStage = { trainerId: new ObjectId(userId) };
            localField = "userId";
            foreignField = "_id";
        }

        const subscriptions = await Subscription.aggregate([
            { $match: matchStage },
            {
                $lookup: {
                    from: "users",
                    localField,
                    foreignField,
                    as: "trainer",
                },
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "packageId",
                    foreignField: "_id",
                    as: "package",
                },
            },
            {
                $lookup: {
                    from: "transactions",
                    localField: "_id",
                    foreignField: "subscriptionId",
                    as: "transaction",
                },
            },
            {
                $project: {
                    paymentId: 1,
                    trainerId: 1,
                    startDate: 1,
                    endDate: 1,
                    gst: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    "trainer.firstName": { $arrayElemAt: ["$trainer.firstName", 0] },
                    "trainer.lastName": { $arrayElemAt: ["$trainer.lastName", 0] },
                    "package.name": { $arrayElemAt: ["$package.name", 0] },
                    "package.duration": { $arrayElemAt: ["$package.duration", 0] },
                    "transaction.trainerAmount": { $arrayElemAt: ["$transaction.trainerAmount", 0] },
                },
            },
            { $sort: { createdAt: 1 } },
        ]);

        if (!subscriptions) {
            return res.status(500).json({ message: "Something went wrong" });
        }

        return res.status(200).json({ subscriptions });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    subscription,
    subscriptionDetails
};