const User = require("../../models/usersMdl");
const Workout = require("../../models/workoutMdl");
const Level = require("../../models/levelsMdl");
const Package = require("../../models/packageMdl");
const Subscription = require("../../models/subscriptionMdl");
const Transaction = require("../../models/transactionMdl");
const { TRAINER_ROLE } = require("../../constants/roles")

const trainers = async (req, res) => {
    try {
        const { userId } = req.query
        if (!userId)
            return res.status(400).json({ message: "Something went wrong" });
        const user = await User.findById(userId)
        if (!user)
            return res.status(400).json({ message: "Invalid user" });

        const level = await Level.findOne({ name: "Beginner" }, { _id: 1 })
        // const levelMatch = !user.isSubscriber ? { difficultyLevel: level._id } : {}
        const limitCount = !user.isSubscriber ? 10 : null
        let trainersList = ""
        trainersList = await User.aggregate([
            { $match: { isActive: true, role: TRAINER_ROLE } },
            {
                $lookup: {
                    from: "workouts",
                    localField: "_id",
                    foreignField: "trainerId",
                    as: "workouts",
                }
            },
            { $sort: { createdAt: 1 } }
        ])
        // if (user.isSubscriber) {
        //     trainersList = await User.aggregate([
        //         { $match: { isActive: true, role: TRAINER_ROLE } },
        //         {
        //             $lookup: {
        //                 from: "workouts",
        //                 localField: "_id",
        //                 foreignField: "trainerId",
        //                 as: "workouts",
        //             }
        //         },
        //         { $sort: { createdAt: 1 } }
        //     ])
        // } else {
        //     trainersList = await Workout.aggregate([
        //         { $match: { status: true, difficultyLevel: level._id } },
        //         {
        //             $lookup: {
        //                 from: "users",
        //                 localField: "trainerId",
        //                 foreignField: "_id",
        //                 as: "users",
        //             }
        //         },
        //         {
        //             $project: {
        //                 workoutTitle: 1,
        //                 description: 1,
        //                 video: 1,
        //                 thumbnailImage: 1,
        //                 totalDuration: 1,
        //                 viewers: 1,
        //                 createdAt: 1,
        //                 user: { $arrayElemAt: ["$users", 0] }
        //             }
        //         },
        //         { $limit: 10 }, { $sort: { createdAt: 1 } }
        //     ])
        // }
        return res.status(200).json({ trainers: trainersList });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const packages = async (req, res) => {
    const packages = await Package.find({ status: true })
    if (packages)
        return res.status(200).json({ packages: packages });
    return res.status(400).json({ message: error.message });
}

const subscription = async (req, res) => {
    try {
        const { address, package, phone } = req.body.formdata
        const { transactionId } = req.body
        console.log(req.query);
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
                } catch (error) {
                    console.error('Error updating user:', error);
                }

                return res.status(200).json({ message: "Payment successful" });
            }
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    trainers,
    packages,
    subscription
};