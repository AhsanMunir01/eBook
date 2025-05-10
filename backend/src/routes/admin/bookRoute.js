const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddleware');
const { createBook, getAllBooks, getBookById, deleteBook, updateBook, searchBook } = require('../../controllers/admin/bookController');

router.post('/', authenticateJWT, authorizeRole('ADMIN'), createBook);
router.get('/', authenticateJWT, authorizeRole('ADMIN'), getAllBooks);
router.get('/search/:genre', authenticateJWT, authorizeRole('ADMIN'), searchBook);
router.get('/:id', authenticateJWT, authorizeRole('ADMIN'), getBookById);
router.delete('/:id', authenticateJWT, authorizeRole('ADMIN'), deleteBook);
router.put('/:id', authenticateJWT, authorizeRole('ADMIN'), updateBook);


module.exports = router;


