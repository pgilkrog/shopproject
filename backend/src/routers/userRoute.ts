import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User }  from '../models/User';
import auth from '../middleware/auth';

import * as config from "../config/default.json";

const router = express.Router();
const jsonParser = bodyParser.json();

// @route       GET api/auth
// @desc        Get logged in user
router.get('/auth/', auth, async (req: Request, res: Response) => {
    try{
        const user = await User.findById(req.body.user._id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error');
    }
});

// @route       POST api/auth
// @desc        Auth user & get token
router.post('/auth/', jsonParser, [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try{
        // Find a user with email
        const user = await User.findOne({ email }) as any;
        
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials!'});
        }

        // Check if passwords match eachother
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials!'});
        }
        
        const payload = {
            user: {
                _id: user._id
            }
        }

        const id = user._id;
        const role = user.type;

        // Make a json web token
        jwt.sign(payload, config.jwtSecret, {
            expiresIn: 3600
        }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({ token, id, role });
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//@desc Find a User
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ user })
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

//@desc Create a User
router.post('/', jsonParser, [ 
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6}) ],
async (req: Request, res: Response) => {

    const errors = validationResult(req.body);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    console.log(name, email, password);
    try {
        // Look for user with email
        let fetchedUser = await User.findOne({ email });

        if(fetchedUser) {
            return res.status(400).json({ msg: 'User already exists'});
        }

        // Generate a hashed password
        const salt = await bcrypt.genSalt(10);

        let user = new User({
            name,
            email,
            password: await bcrypt.hash(password, salt)
        }) as any;

        // Save new user
        await user.save();

        const payload = {
            user: {
                _id: user._id
            }
        }

        const id = user._id;
        const role = user.type;

        // Make a json web token
        jwt.sign(payload, config.jwtSecret, {
            
            expiresIn: 3600
        }, (err, token) => {
            if(err){
                throw err;
            }
            res.json({ token, id, role });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;