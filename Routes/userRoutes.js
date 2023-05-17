const express = require('express')
const userRouter = express.Router();
const { protect } = require('../Middlewares/authMiddleware')
const { signUp,
    updateUser,
    getUser,
    deleteUser,
    login, logout} = require('../Controllers/userController')

    userRouter.route('/login').post(login);
    userRouter.route('/register').post(signUp);
    userRouter.route('/me').get(protect,getUser)


    module.exports = userRouter;