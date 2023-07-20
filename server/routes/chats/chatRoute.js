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

module.exports = chatRoute