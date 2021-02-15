import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
// import {extractFile} from '../middleware/fileMulter';

import { Order } from '../models/Order';

const router = express.Router();
const jsonParser = bodyParser.json();

//@desc Create an Order
router.post('/', jsonParser, async (req: Request, res: Response) => {
    const { items, totalPrice, totalNumberItems, userEmail, status, address, city } = req.body;
    //const items = Array.from(req.body.items);
    try {
        const newOrder = new Order({
            items,
            totalPrice, 
            totalNumberItems, 
            userEmail, 
            status, 
            address, 
            city
        })
        await newOrder.save();
        res.json({ completed: true });
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;