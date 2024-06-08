const User = require('../models/user.model');
const ConflictError = require('../errors/conflict.error');
const NotFoundError = require('../errors/notFound.error');

class AuthRepository {
    async signUpUser(userData) {
        try {
            const { fullName, userName, password, gender, profilePicture } = userData;

            const user = await User.findOne({ userName });
            if(user) {
                throw new ConflictError("User", "Username", userName); // if username already present
            } 
    
            const newUser = await User.create({
                fullName: fullName,
                userName: userName,
                password: password,
                gender: gender,
                profilePicture: profilePicture,
            });
    
            await newUser.save();
            
            const newUserResponse = {
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                gender: newUser.gender,
                profilePicture: newUser.profilePicture
            };
            
            return newUserResponse;
        } catch (error) {
            throw error;
        }
    }

    async logInUser(userData) {
        try {
            const { userName, password } = userData;

            const user = await User.findOne({ userName }); // finding user with the entered username
    
            if(!user) { // if user with entered username not found
                throw new NotFoundError("User", userName);
            }
            
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthRepository;