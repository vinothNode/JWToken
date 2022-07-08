const express = require('express');
const userRouter = express.Router();
const userControl = require('./user-control')
const middleware = require('../utilis/middleware')


userRouter.get('/getall',middleware.authentication,userControl.getAll)
userRouter.post('/sign-up',userControl.signup);
userRouter.post('/login',userControl.login);
userRouter.get('/user-info/:id',middleware.authentication,userControl.getUserDetails);
userRouter.patch('/user-update/:id',middleware.authentication,userControl.userUpdate);
userRouter.delete('/delete/:id',middleware.authentication,userControl.userDelete)








module.exports= userRouter