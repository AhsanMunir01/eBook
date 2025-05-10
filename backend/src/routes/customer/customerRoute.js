const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddleware');
const { getAllBooks, getBookById, searchBook } = require('../../controllers/customer/bookController');


router.get('/', authenticateJWT, authorizeRole('CUSTOMER'), getAllBooks);
router.get('/search/:genre', authenticateJWT, authorizeRole('CUSTOMER'), searchBook);
router.get('/:id', authenticateJWT, authorizeRole('CUSTOMER'), getBookById);

module.exports = router;


