const Book = require('../../models/book');


const fetchAllBooks = async () => {
    return await Book.find();
};
const fetchBookById = async (bookId) => {
    return await Book.findById(bookId);
};



const searchBookByGenre = async (genre) => {
    return await Book.find({ genre: genre });
};


module.exports = {
    fetchAllBooks,
    fetchBookById,
    searchBookByGenre,
}; 