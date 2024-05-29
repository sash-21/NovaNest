const { StatusCodes } = require('http-status-codes');
 
const AuthService = require('../services/auth.service');
const AuthRepository = require('../repositories/auth.repository');
const generateTokenAndSetCookie = require('../utils/generateToken');

const authService = new AuthService(new AuthRepository());

async function signUp(req, res, next) {
    try {
        const newUser = await authService.signUpUser(req.body);

        // Generating a JWT token
        generateTokenAndSetCookie(newUser._id, res); 

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Created a new User",
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
}

async function logIn(req, res, next) {
    try {
        const loginUser = await authService.logInUser(req.body);

        // generating JWT token
        generateTokenAndSetCookie(loginUser._id, res);

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: "User Logged In",
            data: {
                _id: loginUser._id,
                fullName: loginUser.fullName,
                userName: loginUser.userName,
                profilePicture: loginUser.profilePicture,
            },
        });
    } catch (error) {
        next(error);
    }
}

async function logOut(req, res, next) {
    res.send('logout called');
    console.log("logOut");
}

module.exports = {
    signUp,
    logIn,
    logOut
};