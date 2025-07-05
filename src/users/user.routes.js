import express from 'express';
import userController from './users.controller.js';

const UserController = new userController();

const userRouter = express.Router();

userRouter.post('/signin', UserController.signIn);
userRouter.post('/signup', UserController.signUp)

export default userRouter;