const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { timestamps: true });

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;