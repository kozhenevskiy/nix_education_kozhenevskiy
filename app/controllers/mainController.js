import path from 'path';
import {Product} from '../models/product.js';

class mainController {
    async getMain(req, res) {
        try {
            res.status(200).sendFile(path.resolve('app/views/main.html'));
        } catch(err) {
            console.log(err);
            res.status(400).json({message: 'Response error'});
        }       
    }

    async getProducts(req, res) {
        const products = await Product.find();
        res.status(200).json(products);
    }
}

export {mainController};