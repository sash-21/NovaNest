const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');

async function protectRoute(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "User Unauthorized - No Token Provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                error: "User Unauthorized - Token Invalid"
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = protectRoute;