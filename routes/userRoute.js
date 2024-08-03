const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

userRouter.post('/add', userController.addUser);

userRouter.post('/login', userController.loginUser);

module.exports = userRouter;
