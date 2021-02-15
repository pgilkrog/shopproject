import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema ({
    items: {
       type: Array,
       required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalNumberItems: {
        type: Number,
        reqiored: true
    },
    userEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    } 
});

const Order = mongoose.model('Order', orderSchema);

export { Order }