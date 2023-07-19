const asyncHandler = require("express-async-handler")
const UserModel = require("../models/usersMdl.js")
const Chats = require("../models/chatMdl.js")

const accesChats = asyncHandler(async function (req, res) {
    const { _id } = req.headers;
    const { userId } = req.body

    if (!userId) {
        return res.status(400).json({ message: "Could find the user" })
    }

    let isChat = await Chats.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: _id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await UserModel.populate(isChat, {
        path: "latestMessage",
        select: "name email"
    })

    if (isChat.length > 0) {
        res.status(200).json(isChat[0]);
    } else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [_id, userId]
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
    const id = req.user;
    try {
        Chats.find({ users: { $elemMatch: { $eq: id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 }).then(async (result) => {
                result = await UserModel.populate(result, {
                    path: "latestMessage",
                    select: "name email"
                })
                res.status(200).json(result);
            })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

//creating new group chat
const createGroupChat = asyncHandler(async function (req, res) {
    const { users, name } = req.body;
    const { _id } = req.headers;

    if (!users || !name) {
        return res.status(400).json({ message: "Please fill the required feilds" });
    }

    if (users.length < 2) {
        return res.status(400).json({ message: "Need atleast 1 user to start a group chat" });
    }

    users.push(_id);

    try {
        const groupChat = await Chats.create({
            chatName: name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.headers._id
        })
        const fullGroupChat = await Chats.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

})

//rename the group name
const renameGroup = asyncHandler(async function (req, res) {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chats.findByIdAndUpdate(
        { _id: chatId },
        { chatName },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(400);
        throw new Error("chat not found");
    } else {
        res.status(200).json(updatedChat);
    }
});

//add to group 
const addToGroup = asyncHandler(async function (req, res) {
    const { chatId, userId } = req.body;
    const added = await Chats.findByIdAndUpdate(
        { _id: chatId },
        { $push: { users: userId } },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!added) {
        res.status(400);
        throw new Error("chat not found");
    } else {
        res.status(200).json(added);
    }
})

//add to group 
const removeFromGroup = asyncHandler(async function (req, res) {
    const { chatId, userId } = req.body;
    const removed = await Chats.findByIdAndUpdate(
        { _id: chatId },
        { $pull: { users: userId } },
        { new: true }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removed) {
        res.status(400);
        throw new Error("chat not found");
    } else {
        res.status(200).json(removed);
    }
})

//searching users
const searchUsers = asyncHandler(async function (req, res) {
    const { searchQuery } = req.query;
    const { _id } = req.headers;
    if (searchQuery) {
        const searchInput = searchQuery.replace(/\s/gi);
        const users = await UserModel.find({ name: { $regex: `^${ searchInput }`, $options: 'i' }, _id: { $ne: _id } });
        if (users) {
            res.status(200).json(users);
        } else {
            res.json({ message: "No users found" })
        }
    }
})

//seraching users for creating single message
const searchUserForChat = asyncHandler(async function (req, res) {
    const { searchQuery } = req.query;
    const { _id } = req.headers;


    if (searchQuery) {
        const searchIpd = searchQuery.replace(/\s/gi);
        const users = await UserModel.find({ name: { $regex: `^${ searchIpd }`, $options: 'i' }, _id: { $ne: _id } });
        if (users) {
            res.status(200).json(users);
        }
    } else {
        const me = await UserModel.findById(_id);

        const filteredFollowers = me.followers.filter(followerId => followerId.toString() !== _id.toString());
        const filteredFollowing = me.following.filter(followingId => followingId.toString() !== _id.toString());

        const users = await UserModel.find({
            _id: { $in: [...filteredFollowers, ...filteredFollowing] }
        });

        if (users) {
            res.status(200).json(users);
        }
    }
})


module.exports = {
    accesChats,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
    searchUsers,
    searchUserForChat,
}