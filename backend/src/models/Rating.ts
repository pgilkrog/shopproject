import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: false
    },
    itemId: {
        type: String,
        required: true
    }
})

const Rating = mongoose.model('Rating', RatingSchema);

export { Rating }