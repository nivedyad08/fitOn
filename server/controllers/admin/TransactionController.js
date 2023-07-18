const User = require("../../models/usersMdl");
const Transaction = require("../../models/transactionMdl");
const moment = require("moment");

const transactions = async (req, res) => {
    try {
        const transactions = await Transaction.aggregate([
            { $match: {} },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            }, {
                $lookup: {
                    from: "subscriptions",
                    localField: "subscriptionId",
                    foreignField: "_id",
                    as: "subscription",
                },
            },{
                $lookup:{
                    from: "packages",
                    localField: "subscription.packageId",
                    foreignField: "_id",
                    as: "package",
                },
            },
            {
                $project: {
                    role:1,
                    commission:1,
                    adminAmount:1,
                    trainerAmount:1,
                    expiry_date:1,
                    createdAt:1,
                    user: { $arrayElemAt: ["$user", 0] },
                    subscription: { $arrayElemAt: ["$subscription", 0] },
                    package: { $arrayElemAt: ["$package", 0] },
                }
            },
            { $sort: { createdAt: -1 } }
        ])
        if (!transactions)
            return res.status(500).json({ message: "Something went wrong" });
        return res.status(200).json({ transactions: transactions });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




module.exports = {
    transactions,
}