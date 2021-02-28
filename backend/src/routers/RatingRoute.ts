import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Rating } from '../models/Rating';
import auth from '../middleware/auth';

const router = express.Router();
const jsonParser = bodyParser.json();

//@desc Create Rating
router.post('/', auth, jsonParser, async (req: Request, res: Response) => {
    const { rating, userId, commentText, itemId } = req.body;
    try {
        const newRating = new Rating({
            rating,
            userId,
            commentText,
            itemId
        });
        await newRating.save();
        res.json({ newRating });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

//@desc Get ratings by Items Id
router.get('/:itemId', jsonParser, async (req: Request, res: Response) => {
    try {
        const fetchedRatings = await Rating.find({ itemId: req.params.itemId });
        res.json({ ratings: fetchedRatings });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;