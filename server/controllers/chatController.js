const asyncHandler = require("express-async-handler")
const User = require("../models/usersMdl.js")
const Chats = require("../models/chatMdl.js")
const Message = require('../models/messageMdl.js')
const { USER_ROLE, TRAINER_ROLE } = require("../constants/roles.js")
const Subscription = require("../models/subscriptionMdl");
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId

const accesChats = asyncHandler(async function (req, res) {
    const loggedUser = req.user;
    const { userId } = req.query

    if (!userId) {
        return res.status(400).json({ message: "Could find the user" })
    }

    let isChat = await Chats.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: loggedUser } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage",
        select: "name email"
    })

    if (isChat.length > 0) {
        res.status(200).json(isChat[0]);
    } else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [loggedUser, userId]
        }

        try {
            const createChat = await Chats.create(chatData);
            const fullChat = await Chats.findOne({ _id: createChat._id }).populate("users", "-password");

            if (fullChat) res.status(200).json(fullChat);
        } catch (error) {
            res.status(200)
            throw new Error(error.message);
        }
    }
});

//fetching the chats 
const fetchChats = asyncHandler(async function (req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.user);
        const userDetails = await User.findById(req.user)
        let userList;
        if (userDetails.role === USER_ROLE) {
            userList = await User.aggregate([
                {
                    $match: { _id: userId },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "subscriptions.trainerId",
                        foreignField: "_id",
                        as: "chatUsers",
                    },
                },
                {
                    $unwind: "$chatUsers",
                },
                {
                    $match: { "subscriptions.isValid": true },
                },
                {
                    $project: {
                        _id: "$chatUsers._id",
                        firstName: "$chatUsers.firstName",
                        lastName: "$chatUsers.lastName",
                        profilePic: "$chatUsers.profilePic",
                    },
                },
            ]);
        } else if (userDetails.role === TRAINER_ROLE) {
            userList = await User.aggregate([
                {
                    $match: {
                        subscriptions: { $elemMatch: { trainerId: userId } }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        profilePic: 1
                    }
                }
            ]);

        }
        const chatList = await Chats.aggregate([
            {
                $match: {
                    users: userId,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "users",
                    foreignField: "_id",
                    as: "usersData",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "groupAdmin",
                    foreignField: "_id",
                    as: "groupAdminData",
                },
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "latestMessage",
                    foreignField: "_id",
                    as: "latestMessageData",
                },
            },
            {
                $sort: { updatedAt: -1 },
            },
        ]);

        // Merge the users and chats data based on userId to get the desired result
        const combinedList = userList.map(user => ({
            ...user,
            chats: chatList.filter(chat => chat.usersData.find(u => u._id.equals(user._id))),
        }));
        res.status(200).json(combinedList);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//fetch all messages
const allUsersChats = async (req, res) => {
    if (req.user) {
        try {
            const { chatId } = req.query
            const messages = await Message.find({ chat: new ObjectId(chatId) })
                .populate("sender", "firstName profilePic email")
                .populate("chat");
            res.json({ messages: messages });
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
};

//Send message
const sendMessage = async (req, res) => {
    try {
        if (req.user) {
            const { content, chatId } = req.body;
            if (!content || !chatId) {
                console.log("Invalid data passed into request");
                return res.sendStatus(400);
            }

            var newMessage = {
                sender: req.user,
                content: content,
                chat: chatId,
            };
            var message = await Message.create(newMessage);

            message = await message.populate("sender", "firstName profilePic")
            message = await message.populate("chat")
            message = await User.populate(message, {
                path: "chat.users",
                select: "firstName profilePic email",
            });

            await Chats.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

            res.json(message);

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

module.exports = {
    accesChats,
    fetchChats,
    allUsersChats,
    sendMessage
}