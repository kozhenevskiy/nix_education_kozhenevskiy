import Router from 'express';
import {authController} from '../controllers/authController.js';
const authRouter = new Router();
const authControll = new authController();

authRouter.get('', authControll.getPage);
authRouter.post('/registration', authControll.registration);
authRouter.post('/login', authControll.login);

export {authRouter};