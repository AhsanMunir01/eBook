const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddleware');
const { placeOrder } = require('../../controllers/customer/orderController');

// Keep the debug routes

// Add back the authenticated routes
router.post('/', authenticateJWT, authorizeRole('CUSTOMER'), placeOrder);

module.exports = router;


