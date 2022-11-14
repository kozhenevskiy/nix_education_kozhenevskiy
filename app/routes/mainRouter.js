import Router from 'express';
import {mainController} from '../controllers/mainController.js';
const mainRouter = new Router();
const mainControll = new mainController();

mainRouter.get('', mainControll.getMain);
mainRouter.get('/products', mainControll.getProducts);

export {mainRouter};