const User = require("../models/usersMdl");

async function checkSubscriptionStatus() {
    try {
        const users = await User.find({});
        const currentDate = new Date();

        users.forEach((user) => {
            user.subscriptions.forEach((subscription) => {
                subscription.isValid = subscription.endDate >= currentDate;
            });

            user.isSubscriber = user.subscriptions.some((subscription) => subscription.isValid);
        });

        // Save the modified users back to the database
        await Promise.all(users.map((user) => user.save()));

        return users;
    } catch (error) {
        console.error("Error while checking subscription:", error);
    }
}


module.exports = { checkSubscriptionStatus }