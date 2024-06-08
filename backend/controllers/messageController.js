const { StatusCodes } = require('http-status-codes');

const MessagingService = require('../services/messaging.service');
const MessagingRepository = require('../repositories/messaging.repository');

const messagingService = new MessagingService(new MessagingRepository());

async function sendMessage(req, res, next) {
    try {
        const { message } = req.body;
        const { recieverId } = req.params;
        const senderId = req.user._id; // comes from the middleware

        const newMessage = await messagingService.sendMessage(senderId, recieverId, message);

        res.status(StatusCodes.ACCEPTED).json(newMessage);
    } catch (error) {
        next(error);
    }
}

async function getMessages(req, res, next) {
    try {
        const { userId } = req.params;
        const senderId = req.user._id;
    
        const getChats = await messagingService.getMessages(senderId, userId);
    
        res.status(StatusCodes.ACCEPTED).json(getChats);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    sendMessage,
    getMessages
}