const { io, getReceiverSocketId } = require("../socket/socket");

class MessagingService {
    constructor(messagingRepository) {
        this.messagingRepository = messagingRepository;
    }

    async sendMessage(senderId, recieverId, message) {
        const messageData = {
            senderId,
            recieverId, 
            message,
        };

        const newMessage = await this.messagingRepository.sendMessage(messageData);

        // Socket.io functionality
        const recieverSocketId = getReceiverSocketId(recieverId);
        if(recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }
        
        return newMessage;
    }

    async getMessages(senderId, userId) {
        const chatData = {
            senderId,
            userId,
        };

        const getChats = await this.messagingRepository.getMessages(chatData);

        return getChats;
    }
}

module.exports = MessagingService;