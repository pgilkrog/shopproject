import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import auth from '../middleware/auth';
// import {extractFile} from '../middleware/fileMulter';

import { Item } from '../models/Item';

const router = express.Router();
const jsonParser = bodyParser.json();

//@desc Get all Items
router.get('/', async (req: Request, res: Response) => {
    try {
        const fetchedItems = await Item.find({ });
        res.json({ items: fetchedItems });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

//@desc Get Item By ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        res.json({ item })
    } catch(error: any) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@desc Search items with Name, Description, Category
router.get('/search/:search', async (req: Request, res: Response) => {
    try {
        const fetchedItems = (await Item.find({ })).filter((item: any) =>
            (item.name.toLowerCase().search(new RegExp(req.params.search.toLowerCase())) > -1) ||
            (item.description.toLowerCase().search(new RegExp(req.params.search.toLowerCase())) > -1) ||
            (item.category.toLowerCase().search(new RegExp(req.params.search.toLowerCase())) > -1)
        );
        res.json({ items: fetchedItems });
    } catch (error: any) {
        console.error(error.mesage);
    }
})

router.get('/onSale/:onSale', async (req: Request, res: Response) => {
    try {
        const fetchedItems = await Item.find({ onSale: req.params.onSale })
        res.json({ items: fetchedItems });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@desc Get item By category
router.get('/cat/:category', async (req: Request, res: Response) => {
    try {
        const fetchedItems = await Item.find({ category: req.params.category })
        res.json({ items: fetchedItems });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//desc Get Top Items By NumberBought
router.get('/pop/pop/', async (req: Request, res: Response) => {
    try {
        const fetchedItems = await Item.find({ }).sort({numberBought: -1}).limit(5);
        res.json({ items: fetchedItems })
    } catch (error: any) {
        console.error('[pop error]', error.message);
    }
})

//@desc Autocomplete search
router.get('/autosearch/complete/:search', async (req: Request, res: Response) => {
    try {
        const fetchedItems = (await Item.find({ }).limit(6)).filter((item: any) => 
            (item.name.toLowerCase().search(new RegExp(req.params.search.toLowerCase())) > -1)
        );
        res.json({ items: fetchedItems });
    } catch (error: any) {
        console.log(error.message);
    }
})

//@desc Update an Item
router.post('/:id', jsonParser, async (req: Request, res: Response) => {
    Item.findByIdAndUpdate(req.params.id, {$set:req.body}, {upsert: true},
        (err, doc) => {
            if(err) {
                console.error('[update Item]', err);
            } else {
                res.json({ msg: "Favorite Added!" });
            }
        });
})

//@desc Create Item
router.post('/', auth, jsonParser, async (req: Request, res: Response, next: any) => {
    const { name, description, price, image, companyName, category, amountInStock, numberBought } = req.body;
    // const url = req.protocol + '://' + req.get("host");

    try {
        const newItem = new Item({
            name,
            description,
            price,
            image,
            // image: url + '/images/' + req.file.filename,
            companyName,
            category,
            amountInStock,
            numberBought
        });

        const item = await newItem.save();
        res.json(item);
    } catch (error: any) {
        console.error(error.message);
    }
})

export = router;