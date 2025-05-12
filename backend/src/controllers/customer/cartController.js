const Book = require('../../models/Book');
const User = require('../../models/User');
const { addBookToCart , fetchCartByUser} = require('../../services/customer/cartService');

const postBookToCart = async (req, res) => {
    try {
        const { bookId , userId} = req.body;
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
        
        const result = await addBookToCart(userId, bookId);
        console.log('Cart service result:', result);
        
        return res.status(result.status).json({ message: result.data });
    } catch (error) {
        console.error('Error adding book to cart:', error);
        return res.status(500).json({ error: error.message });
    }
};

const getCartByUser = async (req, res) => {
    try {
        // Try to get user ID from multiple sources
        
        const userId = req.params.userId;
        
        
        console.log('Request details:', {
            params: req.params,
            query: req.query,
            user: req.user
        });
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        console.log('Fetching cart for user:', userId);
        
        const result = await fetchCartByUser(userId);
        console.log('Cart service result:', result);
        
        return res.status(result.status).json({ data: result.data });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
    postBookToCart,
    getCartByUser
};