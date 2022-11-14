import express from 'express';
import mongoose from 'mongoose';
import {authRouter} from './routes/authRouter.js';
import {mainRouter} from './routes/mainRouter.js';
import {checkToken} from './middleware/mainMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

const port = process.env.PORT || 80;

app.use(cookieParser());
app.use(express.static(path.resolve('app/public')));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/main', checkToken, mainRouter);
app.use('', (req, res) => {
    res.redirect('/main');
})

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://kozhenevskiyandrey:geDgcAE3UVaPgzmz@mac-outlet-shop.tozjp0o.mongodb.net/mac-outlet-shop?retryWrites=true&w=majority')
                        .then(console.log('db connected'));
        app.listen(port, () => {console.log('Server started')});
    } catch (err) {
        console.log(err);
    }
}

start();