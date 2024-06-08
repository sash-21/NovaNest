const User = require('../models/user.model');
const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

const NotFoundError = require('../errors/notFound.error');

class MessagingRepository {
    async sendMessage(messageData) {
        try {
            const { message, senderId, recieverId } = messageData;

            // if sender with the user id is not found
            const sender = await User.findById(senderId);
            if(!sender) {
                throw new NotFoundError("User-Sender", senderId);
            }
    
            // if reciever with the user id is not found
            const reciever = await User.findById(recieverId);
            if(!reciever) {
                throw new NotFoundError("User-Reciever", recieverId);
            }
    
            // finding for a conversation between sender & reciever
            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, recieverId] },
            });
    
            // if conversation not present then create one
            if(!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, recieverId],
                });
            }
    
            // We create a new message object
            const newMessage = await Message.create({
                senderId,
                recieverId,
                message,
            });
    
            // If the newMessage is created then we push it into the messages array of conversations
            if(newMessage) {
                conversation.messages.push(newMessage._id);
            }
            
            // save the newly inserted data
            await Promise.all([conversation.save(), newMessage.save()]);

            return newMessage;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getMessages(chatData) {
        const { senderId, userId } = chatData;

        // if sender with the user id is not found
        const sender = await User.findById(senderId);
        if(!sender) {
            throw new NotFoundError("User-Sender", senderId);
        }

        // if reciever with the user id is not found
        const user = await User.findById(userId);
        if(!user) {
            throw new NotFoundError("User", userId);
        }
        
        // finding all the conversation between the sender and a particular user
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userId] },
        }).populate("messages");

        if(!conversation) return [];

        const messages = conversation.messages;

        return messages;
    }
}

module.exports = MessagingRepository;