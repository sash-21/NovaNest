const User = require('../models/user.model');
const ConflictError = require('../errors/conflict.error');

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
    
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthRepository;