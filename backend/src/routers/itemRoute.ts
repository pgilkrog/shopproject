import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
// import {extractFile} from '../middleware/fileMulter';

import { Item } from '../models/Item';

const router = express.Router();
const jsonParser = bodyParser.json();

//@desc Get all Items
router.get('/', async (req: Request, res: Response) => {
    try {
        const fetchedItems = await Item.find({ });
        res.json({ items: fetchedItems });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

//@desc Get Item from ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json({ item })
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//@desc Get item from category
router.get('/cat/:category', async (req: Request, res: Response) => {
    try {
        const fetchedItems = await Item.find({ category: req.params.category })
        res.json({ items: fetchedItems });
    } catch (error) {
        console.error(error.message);
    }
})

//@desc Update an Item
router.post('/:id', jsonParser, async (req: Request, res: Response) => {
    const { name, description, price, image, companyName, category, amountInStock } = req.body;

    const item = new Item({    
        name: name,
        description: description,
        price: price,
        image: image,
        companyName: companyName,
        category: category,
        amountInStock: amountInStock
    });

    Item.findByIdAndUpdate(req.params.id,{$set:req.body}, {upsert: true},
        function(err, doc) {
            if(err) {
                console.log(err);
            } else {
                res.json({ msg: "Favorite Added!" })
            }
        });
})

//@desc Create Item
router.post('/', jsonParser, async (req: Request, res: Response, next: any) => {
    const { name, description, price, image, companyName, category, amountInStock } = req.body;

    try {
        const newItem = new Item({
            name,
            description,
            price,
            image,
            companyName,
            category,
            amountInStock
        });

        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
    }
})

export = router;