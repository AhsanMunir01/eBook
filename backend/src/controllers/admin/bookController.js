const{postBook, fetchAllBooks, fetchBookById, removeBook, modifyBook, searchBookByGenre} = require('../../services/admin/bookService');

const createBook = async (req, res) => {
    try{
        const newBook = await postBook(req.body);
        res.status(201).json({
           
            message: 'Book created successfully',
            body: newBook
        });
    }catch (error) {
        res.status(400).json({
           error: error.message
        });                                  
    }
};
const getAllBooks = async (req, res) => {
    try{
        const books = await fetchAllBooks();
        res.status(200).json({
         books
        });
    }catch (error) {
        res.status(500).json({
           error: error.message
        });
    }
};

const getBookById = async (req, res) => {
    try{
        const book = await fetchBookById(req.params.id);
        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }
        res.status(200).json({
            book
        });
    }catch (error) {
        res.status(500).json({
           error: error.message
        });
    }
};

const deleteBook = async (req, res) => {
    try{
        const deletedBook = await removeBook(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }
        res.status(200).json({
            message: 'Book deleted successfully',
            
        });
    }catch (error) {
        res.status(500).json({
           error: error.message
        });
    }
};

const updateBook = async (req, res) => {
    try{
        const updatedBook = await modifyBook(req.params.id, req.body);
        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }
        res.status(200).json({
            message: 'Book updated successfully',
            updatedBook
        });
    }catch (error) {
        res.status(500).json({
           error: error.message
        });
    }
};

const searchBook = async (req, res) => {
    try{
       const book = await searchBookByGenre(req.params.genre);
        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }
        res.status(200).json({
            book
        });
    }catch (error) {
        res.status(500).json({
           error: error.message
        });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    deleteBook, 
    updateBook,
    searchBook
};