const express = require("express");
const ChatRouter = express();
const isUser = require("../../middlewares/isUser")
const {
    accesChats,
    addToGroup,
    createGroupChat,
    fetchChats,
    removeFromGroup,
    renameGroup,
    searchUserForChat,
    searchUsers
} = require("../../controllers/chatController");


ChatRouter.route('/').post(isUser, accesChats).get(isUser, fetchChats);
ChatRouter.get('/users', isUser, searchUsers);
ChatRouter.get('/users/find', isUser, searchUserForChat);
ChatRouter.post('/group', isUser, createGroupChat);
ChatRouter.put('/rename', isUser, renameGroup);
ChatRouter.put('/add/group', isUser, addToGroup);
ChatRouter.put('/remove/group', isUser, removeFromGroup);

module.exports = ChatRouter