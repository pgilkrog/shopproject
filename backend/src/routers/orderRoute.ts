import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
// import {extractFile} from '../middleware/fileMulter';

import { Order } from '../models/Order';

const router = express.Router();
const jsonParser = bodyParser.json();

//@desc Create an Order
router.post('/', jsonParser, async (req: Request, res: Response) => {
    const { items, totalPrice, totalNumberItems, userEmail, status, address, city } = req.body;

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

//@desc Get Orders by UserEmail
router.get('/:email', async(req: Request, res: Response) => {

    try {
        const fetchedOrders = await Order.find({ userEmail: req.params.email })
        res.json({ orders: fetchedOrders });
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;