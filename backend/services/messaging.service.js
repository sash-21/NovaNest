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