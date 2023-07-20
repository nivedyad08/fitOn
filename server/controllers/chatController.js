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
        console.log("alllllllllll=>", combinedList);
        res.status(200).json(combinedList);



        // res.status(200).json(userListWithChats);

        // console.log("alllllllllll=>", combinedList);
        // res.status(200).json(chats);
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
            console.log(req.body);
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









//creating new group chat
// const createGroupChat = asyncHandler(async function (req, res) {
//     const { users, name } = req.body;
//     const { _id } = req.headers;

//     if (!users || !name) {
//         return res.status(400).json({ message: "Please fill the required feilds" });
//     }

//     if (users.length < 2) {
//         return res.status(400).json({ message: "Need atleast 1 user to start a group chat" });
//     }

//     users.push(_id);

//     try {
//         const groupChat = await Chats.create({
//             chatName: name,
//             users: users,
//             isGroupChat: true,
//             groupAdmin: req.headers._id
//         })
//         const fullGroupChat = await Chats.findOne({ _id: groupChat._id })
//             .populate("users", "-password")
//             .populate("groupAdmin", "-password");

//         res.status(200).json(fullGroupChat);
//     } catch (error) {
//         res.status(400);
//         throw new Error(error.message);
//     }

// })

//rename the group name
// const renameGroup = asyncHandler(async function (req, res) {
//     const { chatId, chatName } = req.body;
//     const updatedChat = await Chats.findByIdAndUpdate(
//         { _id: chatId },
//         { chatName },
//         { new: true }
//     )
//         .populate("users", "-password")
//         .populate("groupAdmin", "-password");
//     if (!updatedChat) {
//         res.status(400);
//         throw new Error("chat not found");
//     } else {
//         res.status(200).json(updatedChat);
//     }
// });

//add to group 
// const addToGroup = asyncHandler(async function (req, res) {
//     const { chatId, userId } = req.body;
//     const added = await Chats.findByIdAndUpdate(
//         { _id: chatId },
//         { $push: { users: userId } },
//         { new: true }
//     )
//         .populate("users", "-password")
//         .populate("groupAdmin", "-password");
//     if (!added) {
//         res.status(400);
//         throw new Error("chat not found");
//     } else {
//         res.status(200).json(added);
//     }
// })

//add to group 
// const removeFromGroup = asyncHandler(async function (req, res) {
//     const { chatId, userId } = req.body;
//     const removed = await Chats.findByIdAndUpdate(
//         { _id: chatId },
//         { $pull: { users: userId } },
//         { new: true }
//     )
//         .populate("users", "-password")
//         .populate("groupAdmin", "-password");
//     if (!removed) {
//         res.status(400);
//         throw new Error("chat not found");
//     } else {
//         res.status(200).json(removed);
//     }
// })

//searching users
// const searchUsers = asyncHandler(async function (req, res) {
//     const { searchQuery } = req.query;
//     const { _id } = req.headers;
//     if (searchQuery) {
//         const searchInput = searchQuery.replace(/\s/gi);
//         const users = await UserModel.find({ name: { $regex: `^${ searchInput }`, $options: 'i' }, _id: { $ne: _id } });
//         if (users) {
//             res.status(200).json(users);
//         } else {
//             res.json({ message: "No users found" })
//         }
//     }
// })

//seraching users for creating single message
// const searchUserForChat = asyncHandler(async function (req, res) {
//     const { searchQuery } = req.query;
//     const { _id } = req.headers;


//     if (searchQuery) {
//         const searchIpd = searchQuery.replace(/\s/gi);
//         const users = await UserModel.find({ name: { $regex: `^${ searchIpd }`, $options: 'i' }, _id: { $ne: _id } });
//         if (users) {
//             res.status(200).json(users);
//         }
//     } else {
//         const me = await UserModel.findById(_id);

//         const filteredFollowers = me.followers.filter(followerId => followerId.toString() !== _id.toString());
//         const filteredFollowing = me.following.filter(followingId => followingId.toString() !== _id.toString());

//         const users = await UserModel.find({
//             _id: { $in: [...filteredFollowers, ...filteredFollowing] }
//         });

//         if (users) {
//             res.status(200).json(users);
//         }
//     }
// })


module.exports = {
    accesChats,
    fetchChats,
    allUsersChats,
    sendMessage
    // createGroupChat,
    // renameGroup,
    // addToGroup,
    // removeFromGroup,
    // searchUsers,
    // searchUserForChat,
}