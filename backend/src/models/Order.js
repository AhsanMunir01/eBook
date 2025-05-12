const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
   orderDescription: {
       type: String,
   },
   amount: {
        type: Number,
       
   },
   address: {
        type: String,
        required: [true],
   },
   orderStatus: {
        type: String,
        required: [true],
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
   },
   trackingId: {
        type: String,
       default: ()=> require('uuid').v4()
   },
    user: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User',
           required: true
       },
    cartItems: [{
           type: mongoose.Schema.Types.ObjectId,
           ref: 'CartItem'
       }],
},{timestamps: true});

    const Order = mongoose.model('Order', orderSchema);
    module.exports = Order;