const express = require('express');

const { sendMessage, getMessages } = require('../controllers/messageController');
const protectRoute = require('../middlewares/protectRoute');

const messageRouter = express.Router();

messageRouter.get('/:userId', protectRoute, getMessages);

messageRouter.post('/send/:recieverId', protectRoute, sendMessage);

module.exports = messageRouter;