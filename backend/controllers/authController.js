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
    res.send('login called');
    console.log("logIn");
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