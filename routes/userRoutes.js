const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const auth = require('../utils/auth');

// define the endpoints
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', auth.verifyToken, userController.logout);
userRouter.get('/me', auth.verifyToken, userController.me);
userRouter.get('/', auth.verifyToken, auth.isAdmin, userController.getAllUsers);

module.exports = userRouter;