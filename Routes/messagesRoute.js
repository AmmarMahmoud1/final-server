const express = require('express')
const cookieParser = require("cookie-parser")
const messageRouter = express.Router();

messageRouter.use(cookieParser());

const { addMessage, getAllMessage } = require("../Controllers/messagesController");

messageRouter.route('/addmsg').post( addMessage);
messageRouter.route('/all').get( getAllMessage);



module.exports = messageRouter;