const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddleware');
const { postBookToCart, getCartByUser } = require('../../controllers/customer/cartController');

// Keep the debug routes

// Add back the authenticated routes
router.post('/', authenticateJWT, authorizeRole('CUSTOMER'), postBookToCart);
router.get('/:userId', authenticateJWT, authorizeRole('CUSTOMER'), getCartByUser);

module.exports = router;


