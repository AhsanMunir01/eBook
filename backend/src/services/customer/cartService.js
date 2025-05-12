const Order = require('../../models/Order');
const Book = require('../../models/Book'); // Changed from lowercase 'book' to 'Book'
const User = require('../../models/User'); // Changed from lowercase 'user' to 'User'
const CartItem = require('../../models/CartItem');

const addBookToCart = async (userId, bookId) => {
    const activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' }).populate('cartItems')
    if(!activeOrder)
        return {status: 404, data: 'No active order found for this user.'};

    if(activeOrder.cartItems.some(item => item.book.toString() === bookId)) {
        return {status: 400, data: 'Book already in cart.'};
    }
    
    // Now using the correctly capitalized variable names
    const [bookData, userData] = await Promise.all([
        Book.findById(bookId),
        User.findById(userId)
    ]);

    if(!bookData || !userData) {
        return {status: 404, data: 'Book or user not found.'};
    }

    // Also using the correct variable names here
    const saveCartItem = await new CartItem({
        order: activeOrder._id,
        user: userData._id,
        book: bookData._id,
        price: bookData.price,
        quantity: 1
    }).save();

    activeOrder.amount += bookData.price;
    activeOrder.cartItems.push(saveCartItem._id);
    await activeOrder.save();

    return {status: 201, data: 'Book added to cart successfully.'};
};

const fetchCartByUser = async (userId, bookId) => {
    try {
        const activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' })
            .populate({
                path: 'cartItems',
                populate: { path: 'book' }
            });
                  
        // Return empty array instead of 404 when no order exists
        if (!activeOrder) {
            return {status: 200, data: []};  // Return empty cart instead of error
        }

        return {status: 200, data: activeOrder.cartItems};
    } catch (error) {
        console.error('Error in fetchCartByUser:', error);
        return {status: 500, data: [], message: error.message};
    }
};

module.exports = {
    addBookToCart,
    fetchCartByUser
};