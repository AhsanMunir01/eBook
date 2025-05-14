const Book = require('../../models/Book');
const User = require('../../models/User');
const { placeAnOrder} = require('../../services/customer/orderService');

const placeOrder = async (req, res) => {
    try {
        const { bookId , userId} = req.body;
        const {orderDescription, address} = req.body;
        // const userId = req.user?.id || req.body.userId;
        
        console.log('Request user object:', req.user);
        
        if (!bookId) {
            return res.status(400).json({ error: 'Book ID is required' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        console.log('Adding book to cart:', { userId, bookId });
        
        // Verify book exists
        const book = await Book.findById(bookId);
        console.log('Book found:', book ? 'Yes' : 'No', book ? `(${book._id})` : '');
        if (!book) {
            return res.status(404).json({ error: `Book not found with ID: ${bookId}` });
        }
        
        // Verify user exists
        const user = await User.findById(userId);
        console.log('User found:', user ? 'Yes' : 'No', user ? `(${user._id})` : '');
        if (!user) {
            return res.status(404).json({ error: `User not found with ID: ${userId}` });
        }
        
        const result = await placeAnOrder(userId, orderDescription, address);
        console.log('Cart service result:', result);
        
        return res.status(result.status).json({ order: result.data });
    } catch (error) {
        console.error('Error adding book to cart:', error);
        return res.status(500).json({ error: error.message });
    }
};


 

module.exports = {
    placeOrder
};