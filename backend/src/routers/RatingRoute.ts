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
        res.status(500).send('server error');
    }
})

//@desc Get ratings by Items Id
router.get('/:itemId', jsonParser, async (req: Request, res: Response) => {
    console.log("check", req.params.itemId);
    try {
        const fetchedRatings = await Rating.find({ itemId: req.params.itemId });
        res.json({ ratings: fetchedRatings });
    } catch (error) {
        res.status(500).send('server error');
    }
})

//@desc Get ratings by user id
router.get('/userratings/:userId', jsonParser, async (req: Request, res: Response) => {
    try {
        const fetchedRatings = await Rating.find({ userId: req.params.userId });
        res.json({ ratings: fetchedRatings });
    } catch (error) {
        res.status(500).send('Server Error')
    }
})

module.exports = router;