const express = require("express");
const chatRoute = express();
const isUser = require("../../middlewares/isUser")
const {
    accesChats,
    fetchChats,
    allUsersChats,
    sendMessage
} = require("../../controllers/chatController");


chatRoute.route('/').post(isUser, accesChats).get(isUser, fetchChats);
chatRoute.get('/allChats', isUser, allUsersChats);
chatRoute.post('/sendMessage', isUser, sendMessage)
// ChatRouter.get('/users', isUser, searchUsers);
// ChatRouter.get('/users/find', isUser, searchUserForChat);
// ChatRouter.post('/group', isUser, createGroupChat);
// ChatRouter.put('/rename', isUser, renameGroup);
// ChatRouter.put('/add/group', isUser, addToGroup);
// ChatRouter.put('/remove/group', isUser, removeFromGroup);

module.exports = chatRoute