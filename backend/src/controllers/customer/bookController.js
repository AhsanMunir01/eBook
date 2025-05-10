const{fetchAllBooks, fetchBookById, searchBookByGenre} = require('../../services/customer/bookService');

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
    getAllBooks,
    getBookById,
    searchBook
};