import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: 'http://localhost:4000/images/defaultImage.png'
    },
    companyName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amountInStock: {
        type: Number,
        default: 0
    },
    numberBought: {
        type: Number,
        default: 0
    }
});

const Item = mongoose.model('Item', itemSchema);

export{ Item }
