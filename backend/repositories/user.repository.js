const User = require('../models/user.model');
const NotFoundError = require('../errors/notFound.error');

class UserRepository {
    async getAllUsers(loggedInUserId) {
        try {
            // finding the user and throwing error if not found
            const user = await User.findById(loggedInUserId);
            if(!user) {
                throw new NotFoundError("User", loggedInUserId);
            }

            // return all the users on the platform except self
            const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
            return filteredUsers;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserRepository;