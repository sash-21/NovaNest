const express = require('express');

const { getUsersforSidebar } = require('../controllers/userController');
const protectRoute = require('../middlewares/protectRoute');

const userRouter = express.Router();

userRouter.get('/', protectRoute, getUsersforSidebar);

module.exports = userRouter;