import jwt from 'jsonwebtoken';
import {key} from '../config/tokenKey.js';

function checkToken (req, res, next) {
    try {
        const token = req.cookies.macOutletTOKEN;
        if(!token) {
            res.redirect('/auth');
        }
        jwt.verify(token, key.secret);
        next()
    } catch (err) {
        console.log(err);
        res.redirect('/auth');
    }
}

export {checkToken}