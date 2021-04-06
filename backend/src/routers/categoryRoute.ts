import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Category } from '../models/Category';
import auth from '../middleware/auth';

const router = express.Router();
const jsonParser = bodyParser.json();

//@desc get all categories
router.get('/', async (req: Request, res: Response) => {
    try {
        const fetchedCategories = await Category.find({ });
        fetchedCategories.sort(function(a: any, b: any){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        });
        res.json({ categories: fetchedCategories })
    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

//@desc create category
router.post('/', auth, jsonParser, async (req: Request, res: Response, next: any) => {
    const {name} = req.body;
    try {
        const newCategory = new Category({
            name 
        });
        const category = await newCategory.save();
        res.json(category);
    } catch(err) {
        console.log(err.message);
    }
})

module.exports = router;