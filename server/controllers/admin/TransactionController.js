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
                $lookup: {
                    from: "subscriptions",
                    localField: "subscriptionId",
                    foreignField: "_id",
                    as: "subscription",
                },
            },
            { $sort: { createdAt: 1 } }
        ])
        console.log(transactions);
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