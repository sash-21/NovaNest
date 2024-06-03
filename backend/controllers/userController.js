const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/user.service');
const UserRepository = require('../repositories/user.repository');

const userService = new UserService(new UserRepository());

async function getUsersforSidebar(req, res, next) {
    try {
        const loggedInUserId = req.user._id;

        const allUsers = await userService.getAllUsers(loggedInUserId);

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Fetched all users",
            data: allUsers,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUsersforSidebar,
};