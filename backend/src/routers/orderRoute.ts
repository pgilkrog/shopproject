import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import auth from '../middleware/auth';
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
        res.json({ newOrderId: newOrder._id });
    } catch (err) {
        console.log(err.message);
    }
});

//desc Get order by Id
router.get('/:id', async(req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        res.json({ order })
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//@desc Get Orders by UserEmail
router.get('/email/:email', auth, async(req: Request, res: Response) => {
    try {
        const fetchedOrders = await Order.find({ userEmail: req.params.email })
        res.json({ orders: fetchedOrders });
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;