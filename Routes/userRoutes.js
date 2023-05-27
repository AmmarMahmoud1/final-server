const express = require('express')
const cookieParser = require("cookie-parser")
const userRouter = express.Router();

userRouter.use(cookieParser());



const {authenticateToken} = require('../Middlewares/authenticateToken');
const { signUp,

   
    login, logout,getOneUser} = require('../Controllers/userController')

    userRouter.route('/login').post(login);
    userRouter.route('/register').post(signUp);
    userRouter.get('/me',authenticateToken, getOneUser);
  


    module.exports = userRouter;